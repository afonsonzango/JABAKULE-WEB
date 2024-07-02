"use client";

import "@/assets/styles/globals/globals.css";
import { Inter } from "next/font/google";
import React, { ReactNode, createContext, useContext, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type PriceContextType = {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  nProducts: number;
  setNProducts: React.Dispatch<React.SetStateAction<number>>;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

type PriceProviderProps = {
  children: ReactNode;
};

const PriceProvider = ({ children }: PriceProviderProps) => {
  const [price, setPrice] = useState<number>(0);
  const [nProducts, setNProducts] = useState<number>(0);

  return (
    <PriceContext.Provider value={{ price, setPrice, nProducts, setNProducts }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const context = useContext(PriceContext);

  if (!context) {
    throw new Error("UsePrice so pode ser usada dentro do PriceContext");
  }
  
  return context;
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PriceProvider>
          {children}
        </PriceProvider>
      </body>
    </html>
  );
}