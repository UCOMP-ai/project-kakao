import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const fontSans = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kakao Corporation Website Renewal',
  description: `기술을 넘어 신뢰로, 연결을 넘어 가치로. 카카오는 단순한 플랫폼 기업을 넘어 정밀함과 혁신을 갖춘 글로벌 테크 제조 기업으로 진화한다.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${fontSans.className} antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
