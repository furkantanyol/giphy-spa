'use client';

import { ServicesProvider } from '@/application/hooks/useServices';
import { ToastProvider } from '@/application/hooks/useToast';
import { ImageService } from '@/application/services/image.service';
import { IServices } from '@/domain/models/services';
import { GiphyApi } from '@/infrastructure/api/giphy.api';
import { HttpClient } from '@/infrastructure/api/http-client';
import { QueryClient, QueryClientProvider } from '@/lib/remote-state';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

function initializeServices(): IServices {
  const giphyApi = new GiphyApi(new HttpClient());
  const imageService = new ImageService(giphyApi);
  return { imageService };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = initializeServices();
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <ServicesProvider services={services}>
            <ToastProvider>{children}</ToastProvider>
          </ServicesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
