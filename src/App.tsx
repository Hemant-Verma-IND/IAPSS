import { MainLayout } from './components/MainLayout';
import { HeroSection } from './components/HeroSection';
import { ChatInterface } from './components/chat/ChatInterface';


function App() {
  return (
    <MainLayout>
      <HeroSection />
      <ChatInterface />
    </MainLayout>
  );
}

export default App;
