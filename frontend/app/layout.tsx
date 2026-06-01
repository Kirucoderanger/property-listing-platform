import QueryProvider from '@/providers/query-provider';
import "./globals.css";
import Navbar from '@/components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Navbar />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
