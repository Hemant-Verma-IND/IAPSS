# IAPSS - Intelligent Academic Problem-Solving System

A premium, AI-powered conversational IDE for competitive programmers built with React, Vite, Supabase, and Edge Functions.

## Features

- **AI-Powered OCR**: Upload images of competitive programming problems and get structured, formatted problem statements
- **Intelligent Code Formatting**: Submit C++ solutions and receive professionally refactored code in competitive programming style
- **Automated Testing**: Real-time code execution against test cases using Judge0 sandbox
- **Real-Time Streaming**: Server-Sent Events (SSE) for instant feedback during processing
- **Premium UI**: Built with shadcn/ui components, featuring glassmorphism effects and animated backgrounds
- **Persistent Storage**: Problems and submissions are stored in Supabase database

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Premium component library
- **React Markdown** - Rich text rendering
- **React Syntax Highlighter** - Beautiful code display

### Backend
- **Supabase Database** - PostgreSQL for persistent storage
- **Supabase Edge Functions** - Serverless Deno runtime for AI orchestration
- **Gemini AI** - Advanced OCR and code formatting
- **Judge0 API** - Secure code execution sandbox

## Architecture

### Database Schema

**problems** table:
- Stores structured problem data from uploaded images
- Fields: title, description, examples (JSONB), constraints, raw_ocr_text

**submissions** table:
- Stores user code submissions and test results
- Fields: problem_id (FK), user_code, formatted_code, test_results (JSONB), status

### Edge Function

The `/chat` edge function orchestrates the entire AI pipeline:

1. **Image Upload Flow**:
   - Receives images via FormData
   - Performs OCR using Gemini Vision API
   - Structures the problem statement using Gemini AI
   - Streams formatted markdown back to client

2. **Code Submission Flow**:
   - Parses C++ code from user message
   - Formats code to competitive programming standards using Gemini AI
   - Executes code against test cases using Judge0 API
   - Compares outputs and determines verdicts
   - Streams results back to client in real-time

### Frontend Components

- **AnimatedBackground**: Canvas-based particle animation
- **MainLayout**: Global header and page structure
- **HeroSection**: Eye-catching landing section
- **ChatInterface**: Main conversational interface
  - **ChatMessage**: Individual message display with markdown
  - **ChatInput**: Multi-modal input (text + images)
  - **TestResultDisplay**: Rich test case results with verdicts

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (already configured)
- Gemini API key (configured in Supabase)
- RapidAPI key for Judge0 (configured in Supabase)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

All environment variables are pre-configured in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Edge function secrets (automatically configured):
- `GEMINI_API_KEY` - For AI processing
- `RAPIDAPI_KEY` - For Judge0 code execution

## Usage

### Uploading a Problem

1. Click the image icon in the chat input
2. Select one or more images of a competitive programming problem
3. Click send
4. Wait for AI to process and structure the problem

### Submitting a Solution

1. After a problem is uploaded, paste your C++ code in the chat
2. Wrap code in triple backticks with cpp language tag:
   ````
   ```cpp
   // Your code here
   ```
   ````
3. Click send
4. Watch as your code is formatted and tested in real-time
5. View detailed test results with verdicts, runtime, and memory usage

## Design System

### Colors (HSL-based)

- **Primary**: Blue (#667eea) - Main accent color
- **Background**: Dark navy (#0f172a) - Base background
- **Glassmorphism**: Subtle transparency with backdrop blur
- **Gradient Text**: Purple-to-blue gradient for headings

### Typography

- Inter font family (system default)
- Responsive sizing with mobile-first approach
- Semantic heading hierarchy

### Components

All UI components follow shadcn/ui design patterns:
- Accessible and keyboard-navigable
- Dark mode by default
- Consistent spacing and sizing
- Smooth transitions and animations

## API Reference

### POST /functions/v1/chat

Handles both problem upload and code submission via SSE stream.

**Request**:
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `messages`: JSON string of chat history
  - `images`: (optional) File[] for problem images

**Response** (Server-Sent Events):

```javascript
// Problem structuring chunks
data: {"type": "chunk", "payload": "markdown text"}

// Formatted code
data: {"type": "formattedCode", "payload": "formatted cpp code"}

// Test execution results
data: {"type": "runResults", "payload": [{ verdict, output, time, memory }]}

// Errors
data: {"type": "error", "payload": "error message"}
```

## Contributing

This is a demonstration project showcasing integration of:
- Modern React patterns
- Supabase Edge Functions
- AI-powered workflows
- Real-time streaming
- Premium UI design

## License

MIT

## Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Supabase** for the incredible backend platform
- **Google Gemini** for powerful AI capabilities
- **Judge0** for secure code execution
- **Lucide React** for the icon set
