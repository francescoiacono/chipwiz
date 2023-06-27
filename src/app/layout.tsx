import Navbar from '@/components/ui/navbar/navbar';
import './styles/globals.css';
import { Inter } from 'next/font/google';
import { GameStateProvider } from '@/components/providers/gameStateProvider/gameStateProvider';

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
      <body className={inter.className}>
        <GameStateProvider game={null}>
          <Navbar />
          {children}
        </GameStateProvider>
      </body>
    </html>
  );
}
