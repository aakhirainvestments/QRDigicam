import './globals.css';
import type { Metadata } from 'next';
import BuiltBy from '@/components/BuiltBy';

export const metadata: Metadata = {
  title: 'Rayaan & Qudsiyyah — Wedding Camera',
  description: 'A shared camera roll — nobody sees a photo until the reveal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:wght@400;600&family=Lora:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-leaf font-serif">
        {/* Watercolour florals from the invite, washed out so text stays readable */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,239,238,0.78), rgba(249,239,238,0.78)), url(/floral-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 flex flex-col min-h-[100dvh] overflow-x-hidden">{children}</div>
        <BuiltBy />
      </body>
    </html>
  );
}
