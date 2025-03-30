'use client';

import { ServicesProvider } from '@/application/hooks/useServices';
import { ImageService } from '@/application/services/image.service';
import { IServices } from '@/domain/models/services';
import { GiphyApi } from '@/infrastructure/api/giphy.api';
import { HttpClient } from '@/infrastructure/api/http-client';
import { geistMono, geistSans, inter } from '@/lib/fonts';
import { QueryClient, QueryClientProvider } from '@/lib/remote-state';
import { Toaster } from '@/presentation/components/atoms/sonner';
import './globals.css';

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
            {children}
            <Toaster />
          </ServicesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
