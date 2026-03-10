import { AuthProvider } from './_components';
import './global.css';

export const metadata = {
  title: 'team1-frontend-д тавтай морил',
  description: 'create-nx-workspace ашиглан үүсгэсэн',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
