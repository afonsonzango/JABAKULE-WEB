"use client";

import Image from "next/image";
import "@/assets/styles/pages/main/products/products.css";
import _product from "@/assets/midea/products/computer.png";
import { ServerCrash, Settings2, ShoppingCart, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { useCallback, useEffect, useState } from "react";
import axiosSimple from "@/components/cui/hooks/axiosInstances/axiosSimple";
import WaveLoader from "@/components/cui/wave-loader/wave-loader";
import LoadingFailed from "@/components/cui/errors-layouts/loading-failed";
import { Button } from "@/components/ui/button";
import { usePrice } from "@/app/layout";

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
    const { setPrice } = usePrice();
    const { setNProducts } = usePrice();
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const [imageHost, setImageHost] = useState("");
    const limit = 20;

    const fetchProducts = async (page: number, limit: number) => {
        setLoading(true);
        setError("");

        try {
            const response = await axiosSimple.get(`/product/all/${page}/${limit}`);
            const newProducts = response.data.products;

            setImageHost(response.data.fileHost);

            if (newProducts && newProducts.length !== 0) {
                setProducts((prevProducts) => [...prevProducts, ...newProducts]);
                setPage((prevPage) => prevPage + 1);
            } else if (newProducts && newProducts.length === 0) {
                setError("Sem mais produtos.");
            }
        } catch (error) {
            setError("Erro ocorreu buscando produtos");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product: any) => {
        let cart: any = localStorage.getItem('cart');

        if (!cart) { cart = {}; } else { cart = JSON.parse(cart); }

        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = {
                id: product.id,
                image: product.image,
                name: product.name,
                price: product.price,
                quantity: 1,
                user: product.user.name,
                product_host: imageHost
            };
            
            setNProducts(prev => prev + 1);
        }

        setPrice(prev => prev + Number(product.price));

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    useEffect(() => {
        fetchProducts(page, limit);
    }, [])

    return (
        <main className="main-container">
            {
                error === "" ? (
                    products.length !== 0 ? (<>
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
                                {products.map((product, index) => {
                                    return (
                                        <div key={index} className="card mb-5 flex flex-col">
                                            <div className="card-body flex flex-col flex-grow">
                                                <div className="card-image relative">
                                                    <Image src={_product} alt={"Computer product image"} />
                                                    <div className="card-discount">14% Disconto</div>
                                                    <div className="card-trend">
                                                        Up <TrendingUp />
                                                    </div>
                                                </div>
                                                <div className="card-title mb-1 uppercase">
                                                    {product.user?.name}
                                                </div>
                                                <div className="card-name mb-1">
                                                    {product.name}
                                                </div>
                                                <button className="card-value mb-2">
                                                    <span>{product.price} </span>
                                                    <span className="expired">89.093 AOA</span>
                                                </button>
                                                <div className="card-action mt-auto">
                                                    <button onClick={() => addToCart(product)} className="card-reserve-btn py-2 px-4 flex items-center justify-center w-full">
                                                        <ShoppingCart />
                                                        Adicionar ao carrinho
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>) : (
                        <>
                            {!loading &&
                                <div className="error-handleing">
                                    <LoadingFailed Icon={ServerCrash} title={"Sem produtos!"} description={"Infelizmente estamos sem produtos disponiveis, mas estaremos de volta brevemente"} />

                                    <div className="button-position-handleing">
                                        <Button onClick={() => fetchProducts(page, limit)}>Tentar novamente</Button>
                                    </div>
                                </div>
                            }
                        </>
                    )
                ) : (
                    <>
                        {!loading && <div className="error-handleing">
                            <LoadingFailed Icon={ServerCrash} title={"Erro ao buscar produtos"} description={"Alguma coisa aconteceu ao buscar produtos, porfavor tente novamente mais tarde"} />
                            <div className="button-position-handleing">
                                <Button onClick={() => fetchProducts(page, limit)}>Tentar novamente</Button>
                            </div>
                        </div>}
                    </>
                )
            }

            {loading ? <WaveLoader style={{ marginTop: 20, marginBottom: 20 }} /> : <button onClick={() => fetchProducts(page, limit)}>Carregar mais</button>}
        </main>
    );
}
