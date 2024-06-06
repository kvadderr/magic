import React from "react";
import type {Metadata} from "next";
import Navbar from "@/widgets/NavBar/NavBar";
import '../shared/styles/scss/app.scss'
import {Footer} from "@/widgets/footer/Footer";

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
      <div id="modal-portal"></div>
      <Navbar/>
      {children}
      <Footer />
    </div>
    </body>
    </html>
  );
}
