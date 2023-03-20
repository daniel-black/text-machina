import './globals.css';

import { Overpass_Mono } from 'next/font/google'

const overpassMono = Overpass_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Text Machina',
  description: 'So that I may commune with the robot',
};

export type LayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${overpassMono.className}`}
      >
        {children}
      </body>
    </html>
  );
}