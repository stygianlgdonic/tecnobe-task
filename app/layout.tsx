'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Login from "./login/page";
import Register from "./register/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated (e.g., check local storage or session)
    const token = localStorage.getItem('token'); // Example
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticated(false); // Update the authentication state
    router.push('/login'); // Redirect to login page after logout
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Update authentication state
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {pathname === '/login' && <Login onLogin={handleLogin} />}
        {pathname === '/register' && <Register />}
        {isAuthenticated && (
          <nav className="navbar">
            <ul className="flex justify-between items-center">
              <div className="flex space-x-4">
                <li>
                  <Link href="/public-recipes" className="text-white">Public Recipes</Link>
                </li>
                <li>
                  <Link href="/" className="text-white">My Recipes</Link>
                </li>
                <li>
                  <Link href="/mix-it-up" className="text-white">Mix It Up</Link>
                </li>
              </div>
              <li>
                <button onClick={handleLogout} className="text-white">Logout</button>
              </li>
            </ul>
          </nav>
        )}
        {children}
      </body>
    </html>
  );
}
