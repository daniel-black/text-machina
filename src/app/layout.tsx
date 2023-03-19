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
        className={`${overpassMono.className} bg-black text-[#f0fff8] p-3 text-lg`}
        style={{textShadow: '0 0 3px #80ffc0, 0 0 10px #00ff66, 0 0 20px #00ff66, 0 0 30px #00ff66'}}
      >
        {children}
      </body>
    </html>
  );
}
