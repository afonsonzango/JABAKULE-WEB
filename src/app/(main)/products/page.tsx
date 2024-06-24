import "@/assets/styles/pages/main/products/products.css";

import product from "@/assets/midea/products/computer.png";
import Image from "next/image";
import { ShoppingCart, TrendingUp } from "lucide-react";

export default function Page() {
    return (
        <main className="main-container">
            <div className="container top-bar-container">
                <div className="cat-title">Navegue pelos produtos</div>
                <div className="cat-actions">actions</div>
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
