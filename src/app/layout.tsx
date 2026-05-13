import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GameVault | Your Ultimate Gaming Catalog",
  description: "Discover and wishlist your favorite games in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="font-sans bg-bg-base text-text-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="flex min-h-screen flex-col">
              {/* <Navbar /> */}
              <main className="flex-grow">{children}</main>
              {/* <Footer /> */}
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}