import { CircleOff, Minus, Plus, Printer, ShieldCheck, Trash2 } from 'lucide-react';

import cartimages from "@/assets/midea/aditionals/cart_img.jpg";
import computer from "@/assets/midea/products/computer.png";
import Image from 'next/image';
import React from 'react'

const CartComponent = () => {
    return (
        <div className="container">
            <div className="container-copper mb-8 mt-8">
                <div className="container-products-list">
                    <div className="products-fields-list">
                        <div className="topbar-list-products">
                            <div className="text">meu carrinho de compras</div>
                            <div className="action">
                                <button>
                                    <CircleOff />
                                    Cancelar tudo
                                </button>
                            </div>
                        </div>

                        <div className="product-list">
                            <div className="product mb-4">
                                <div className="product-image">
                                    <div>
                                        <Image src={computer} alt={"Product image"} />
                                    </div>
                                </div>
                                <div className='details-quantity-flex'>
                                    <div className="product-details">
                                        <div>
                                            <div className="name">Computador Dell XDLY - 450XC</div>
                                            <div className="price">
                                                <span className='price-primary'>190.000,00 Kz</span>
                                                <span className='price-singular'>190.000,00 Kz</span>
                                            </div>
                                            <div className="detail">
                                                <span className='details-frete'>Frete: a negociar</span>
                                                <span className='details-loja'>- Loja: (B. T. Saadou)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="quantity-section">
                                        <button>
                                            <Minus />
                                        </button>
                                        <input type="text" defaultValue={0} />
                                        <button>
                                            <Plus />
                                        </button>
                                    </div>
                                </div>
                                <div className="delete-button">
                                    <Trash2 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-payment-status">
                    <div>
                        <div className='c-flex'>
                            <div className="c-flex-topbar">
                                <span>Resumo de pagamento</span>

                                <button>
                                    <Printer />
                                    Proforma
                                </button>
                            </div>
                            <div className="c-flex-payment-container">
                                <div className="inf-line mb-4">
                                    <div className="inf-item">Subtotal</div>
                                    <div className="inf-item value">1.500.000,00</div>
                                </div>

                                <div className="inf-line mb-4">
                                    <div className="inf-item">IVA (Incluído)</div>
                                    <div className="inf-item value">0,00</div>
                                </div>

                                <div className="inf-line devider">
                                    <div className="inf-item">Total</div>
                                    <div className="inf-item value">1.500.000,00</div>
                                </div>

                                <div className="actions-button">
                                    <button>avancar com a compra</button>
                                </div>

                                <div className='cart-image'>
                                    <Image src={cartimages} alt={"International Payment Services Logos"} />
                                </div>

                                <div className="cart-protect-information">
                                    <div className="title mb-1">
                                        <ShieldCheck />
                                        Proteção ao cliente
                                    </div>
                                    <div className="desc">Garanta o reembolso caso o produto não seja entregue ou não esteja de acordo com a descrição.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartComponent;