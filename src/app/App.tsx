import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="max-w-[390px] mx-auto min-h-screen bg-background">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
