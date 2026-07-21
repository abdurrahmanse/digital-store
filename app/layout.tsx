import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const rajdhani = Rajdhani({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Digital Product Store",
  description: "Premium minimal digital products marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rajdhani.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster theme="system" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
