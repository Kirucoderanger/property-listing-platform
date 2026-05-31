import Navbar from '@/components/layout/Navbar';
import QueryProvider from '@/providers/query-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        <QueryProvider>

          <Navbar />

          <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>

        </QueryProvider>

      </body>
    </html>
  );
}
