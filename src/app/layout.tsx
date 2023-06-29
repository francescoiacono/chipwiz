import Navbar from '@/components/ui/navbar/navbar';
import './styles/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/themeProvider/themeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChipWiz',
  description: 'ChipWiz is a tool for tracking your poker chips virtually.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ThemeProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
