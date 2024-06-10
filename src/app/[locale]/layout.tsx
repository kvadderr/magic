import React from "react";
import type {Metadata} from "next";
import Navbar from "@/widgets/navbar/NavBar";
import '../../shared/styles/scss/app.scss'
import {Footer} from "@/widgets/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: "MRust",
  description: "w by create next app",
};

export default async function RootLayout({
                                           children, params: {locale}
                                         }: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
    <body>
    <NextIntlClientProvider messages={messages}>
      <div id='root'>
        <div id="modal-portal"></div>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
