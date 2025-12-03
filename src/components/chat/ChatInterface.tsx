import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TestResultDisplay } from './TestResultDisplay';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  testResults?: any[];
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Welcome to IAPSS! Upload an image of a competitive programming problem to get started, or paste your C++ solution code.',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleSend = async (message: string, images?: File[]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message || '📷 [Image uploaded]',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStreamingContent('');

    try {
      const formData = new FormData();
      formData.append('messages', JSON.stringify([...messages, userMessage]));

      if (images && images.length > 0) {
        images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await fetch('http://localhost:3001/api/chat', { method: 'POST', body: formData });
      if (!response.body) throw new Error("Response body is missing.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const aiMessageId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        {
          id: aiMessageId,
          sender: 'ai',
          content: '',
          timestamp: new Date(),
        },
      ]);

      const readStream = async () => {
        const { done, value } = await reader.read();
        if (done) {
          setIsLoading(false);
          setStreamingContent('');
          return;
        }
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              setMessages(prev =>
                prev.map(m => {
                  if (m.id === aiMessageId) {
                    switch (data.type) {
                      case 'chunk':
                        return { ...m, content: m.content + data.payload };
                      case 'formattedCode':
                        return { ...m, formattedCode: data.payload };
                      case 'runResults':
                        return { ...m, testResults: data.payload };
                      case 'error':
                        return { ...m, content: `**Error:** ${data.payload}` };
                      default:
                        return m;
                    }
                  }
                  return m;
                })
              );
            } catch (e) {
              console.error("Parse Error:", line);
            }
          }
        }
        readStream();
      };
      readStream();
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: `❌ Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col gap-4">
      <Card className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-6">
          <div ref={scrollAreaRef} className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                <ChatMessage
                  sender={msg.sender}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
                {msg.testResults && (
                  <div className="mt-4 ml-11">
                    <TestResultDisplay results={msg.testResults} />
                  </div>
                )}
              </div>
            ))}

            {streamingContent && (
              <ChatMessage
                sender="ai"
                content={streamingContent}
              />
            )}
          </div>
        </ScrollArea>
      </Card>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
