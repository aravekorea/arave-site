// app/layout.js
import './globals.css';

export const metadata = {
  title: 'ARAVE',
  description: 'ARAVE — Premium Sleep Mist',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
