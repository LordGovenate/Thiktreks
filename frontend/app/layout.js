export const metadata = {
    title: 'ThikTreks',
    description: 'Plataforma educativa gamificada',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="es">
        <body>{children}</body>
      </html>
    );
  }
  