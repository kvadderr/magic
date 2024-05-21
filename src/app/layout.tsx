import React from "react";
import type {Metadata} from "next";
import Navbar from "@/widgets/NavBar/NavBar";
import '../shared/styles/scss/app.scss'

export const metadata: Metadata = {
  title: "Create Next",
  description: "w by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <div id='root'>
      <Navbar/>
      {children}
    </div>
    </body>
    </html>
  );
}
