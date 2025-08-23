<h1 align="center">AI Notes App📝</h1>

A modern, intelligent note-taking application built with Next.js that integrates AI-powered features for enhanced productivity and note management.

<h1 align="center"> 🚀 Features </h1>

<h1 align="center"> Core Functionality </h1>

- **Real-time Note Editing**: Create, edit, and manage notes with auto-save functionality
- **AI-Powered Assistant**: Ask questions about your notes using Google's Gemini AI
- **User Authentication**: Secure authentication powered by Supabase
- **Search & Navigation**: Fuzzy search through your notes using Fuse.js
- **Responsive Design**: Modern UI with dark/light theme support

<h1 align="center"> AI Features </h1>

- **Contextual AI Chat**: Ask questions about all your notes and get intelligent responses
- **Note Analysis**: AI can understand and analyze the content of your entire note collection
- **Conversational Interface**: Interactive chat interface for seamless AI interaction

<h1 align="center"> User Experience </h1>
- **Auto-save**: Notes are automatically saved as you type
- **Sidebar Navigation**: Easy access to all your notes with search functionality
- **Theme Support**: Dark and light mode with system preference detection
- **Responsive Layout**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.4.5](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with PostCSS
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with shadcn/ui
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

### Backend & Database

- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **API Routes**: Next.js API routes for backend logic

### AI Integration

- **AI Provider**: [Google Gemini AI](https://ai.google.dev/) (@google/genai)
- **Features**: Contextual understanding of notes, conversational AI interface

### Additional Libraries

- **Search**: [Fuse.js](https://fusejs.io/) for fuzzy searching
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- **UUID Generation**: For unique identifiers
- **Form Handling**: Controlled components with React state management

## 📦 Installation

### Prerequisites

- Node.js 18+ (Node.js 22.13.1 recommended)
- npm, yarn, pnpm, or bun
- PostgreSQL database (or Supabase account)
- Google AI API key for Gemini

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key

   # Database
   DATABASE_URL=your_postgresql_connection_string

   # Google AI
   GOOGLE_AI_API_KEY=your_google_gemini_api_key
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npm run migrate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── action/           # Server actions
│   ├── notes.ts     # Note-related server actions
│   └── user.ts      # User-related server actions
├── app/             # Next.js app directory
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── auth/            # Authentication utilities
│   └── server.ts    # Server-side auth helpers
├── components/      # React components
│   ├── ui/          # shadcn/ui components
│   ├── AppSidebar.tsx
│   ├── AskAIButton.tsx
│   ├── AuthForm.tsx
│   └── ...
├── db/              # Database configuration
│   ├── schema.prisma # Prisma schema
│   ├── prisma.ts    # Prisma client
│   └── migrations/  # Database migrations
└── styles/          # Global styles and CSS
```

## 🤖 AI Features Deep Dive

### Ask AI About Your Notes

The AI integration allows users to:

- Ask questions about specific notes or across all notes
- Get contextual responses based on note content
- Maintain conversation history during a session
- Receive formatted responses with proper styling

### Implementation Details

- Uses Google's Gemini AI for natural language processing
- Sends user's complete note collection as context
- Maintains conversation history for better context understanding
- Implements proper error handling and loading states

## 🔐 Authentication Flow

1. **Supabase Integration**: Secure authentication with email/password
2. **Middleware Protection**: Route protection using Next.js middleware
3. **Session Management**: Automatic session handling with cookie-based storage
4. **User Context**: User information available throughout the application

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimalist interface with attention to detail
- **Responsive Layout**: Fully responsive design that works on all devices
- **Accessibility**: Built with accessibility best practices using Radix UI
- **Theme Support**: Dark and light themes with system preference detection
- **Smooth Interactions**: Thoughtful animations and transitions

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - shadcn/ui components configuration
- `package.json` - Dependencies and scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing documentation
2. Review the console for error messages
3. Ensure all environment variables are properly set
4. Verify database connection and migrations

## 🔮 Future Enhancements

- **Real-time Collaboration**: Multi-user editing capabilities
- **Note Templates**: Pre-defined note structures
- **Export Options**: PDF, Markdown, and other format exports
- **Advanced AI Features**: Summary generation, automatic tagging
- **Mobile App**: Native mobile applications
- **Offline Support**: Progressive Web App capabilities

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
