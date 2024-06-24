"use client";

import Image from "next/image";
import "@/assets/styles/pages/main/products/products.css";
import product from "@/assets/midea/products/computer.png";
import { Settings2, ShoppingCart, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    insertedAt: string;
    updatedAt: string;
    category: {
        id: number;
        name: string;
        insertedAt: string;
        updatedAt: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
        nif: string;
        country: string;
        province: string;
        address: string;
        phone_number: string;
        password: string;
        role: string;
        insertedAt: string;
        updatedAt: string;
    } | null;
}

export default function Page() {
    return (
        <main className="main-container">
            <div className="container top-bar-container mt-6 mb-4">
                <div className="cat-title">Navegue pelos produtos</div>
                <TooltipProvider>
                    <div className="cat-actions">
                        <Tooltip>
                            <TooltipTrigger className="action">
                                <TrendingUp />
                                Por popularidade
                            </TooltipTrigger>
                            <TooltipContent>
                                <p style={{ fontSize: 13, fontWeight: 500 }}>Filtrar produtos por popularidade</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="action">
                                <Settings2 />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p style={{ fontSize: 13, fontWeight: 500 }}>Customizar filtro</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>
            <div className="container mx-auto px-4 py-4 products-container">
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-image">
                                <Image src={product} alt={"Computer product image"} />
                                <div className="card-discount">14% Disconto</div>
                                <div className="card-trend">
                                    Up <TrendingUp />
                                </div>
                            </div>
                            <div className="card-title mb-1">
                                JABAKULE STORE
                            </div>
                            <div className="card-name mb-1">
                                Computador Dell Latitude 3015
                            </div>
                            <div className="card-value mb-2">
                                <span>49.093,5 AOA </span>
                                <span className="expired">89.093 AOA</span>
                            </div>
                            <div className="card-action">
                                <button className="card-reserve-btn">
                                    <ShoppingCart />
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
