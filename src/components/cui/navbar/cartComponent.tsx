import { CircleOff, Minus, Plus, Printer, ShieldCheck, ShoppingCartIcon, Trash2 } from 'lucide-react';

import cartimages from "@/assets/midea/aditionals/cart_img.jpg";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { usePrice } from '@/app/layout';

const CartComponent = () => {
    const { price, setPrice } = usePrice();
    const { setNProducts } = usePrice();
    const [cartProducts, setCartProducts] = useState([]);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const iva = 0.14;

    useEffect(() => {
        const calculateDiscountedTotal = (totalPrice: any) => {
            const discount = totalPrice * iva;
            const discountedTotal = totalPrice + discount;
            setDiscountedTotal(discountedTotal);
        };

        calculateDiscountedTotal(price);
    }, [price]);

    useEffect(() => {
        const getCartProducts = () => {
            let cart: any = localStorage.getItem('cart');
            if (!cart) {
                cart = {};
            } else {
                cart = JSON.parse(cart);
            }

            const productsArray: any = Object.keys(cart).map(key => cart[key]);

            setCartProducts(productsArray);
        };

        getCartProducts();
    }, []);

    const updateQuantity = (productId: any, newQuantity: any) => {
        if (newQuantity < 1) {
            return;
        }

        let cart: any = localStorage.getItem('cart');

        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }

        // Atualizar a quantidade do produto no localStorage
        cart[productId].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualizar o estado local para refletir a mudança
        const updatedProducts: any = cartProducts.map((product: any) => {
            if (product.id === productId) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });

        setCartProducts(updatedProducts);
        calculateTotalPrice();
    };

    const removeProduct = (productId: any, productPrice: any, productQuantity: any) => {
        // Calcular o valor total do produto a ser removido e exibir no console
        const totalPrice = productPrice * productQuantity;
        setPrice(prev => prev - totalPrice);

        // Remover o produto do localStorage
        let cart: any = localStorage.getItem('cart');
        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }

        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualizar o estado local para refletir a remoção
        const updatedProducts = cartProducts.filter((product: any) => product.id !== productId);
        setCartProducts(updatedProducts);
        setNProducts(prev => prev - 1);
    };

    const calculateTotalPrice = () => {
        let cart: any = localStorage.getItem('cart');

        if (!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }

        const total = Object.keys(cart).reduce((sum, key) => {
            const product = cart[key];
            return sum + product.price * product.quantity;
        }, 0);

        setPrice(total);
    };

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
                            {cartProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center mt-10 p-6 py-14 px-14 bg-gray-100 rounded-lg">
                                    <ShoppingCartIcon size={48} className="text-gray-500 mt-4" />
                                    <p className="text-lg font-semibold text-gray-700">O carrinho está vazio, adicione produtos para poder comprar.</p>
                                </div>
                            ) : (
                                <>
                                    {cartProducts.map((product: any, index: any) => {
                                        return (
                                            <div className="product mb-4" key={index}>
                                                <Image
                                                    src={`http://${product.product_host || 'localhost:2000'}${product.image}`}
                                                    alt={"Product image"}
                                                    width={100}
                                                    height={100}
                                                />
                                                <div className='details-quantity-flex'>
                                                    <div className="product-details">
                                                        <div>
                                                            <div className="name">{product.name}</div>
                                                            <div className="price">
                                                                <span className='price-primary'>{product.price * product.quantity} Kz</span>
                                                                <span className='price-singular'>{product.price} Kz</span>
                                                            </div>
                                                            <div className="detail">
                                                                <span className='details-frete'>Frete: a negociar</span>
                                                                product.name,                        <span className='details-loja'>- Loja: {product.user}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="quantity-section">
                                                        <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>
                                                            <Minus />
                                                        </button>
                                                        <input type="text" value={product.quantity} readOnly />
                                                        <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>
                                                            <Plus />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="delete-button">
                                                    <button onClick={() => removeProduct(product.id, product.price, product.quantity)}>
                                                        <Trash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
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
                                    <div className="inf-item value">{price} Kz</div>
                                </div>

                                <div className="inf-line mb-4">
                                    <div className="inf-item">IVA (Incluído)</div>
                                    <div className="inf-item value">14%</div>
                                </div>

                                <div className="inf-line devider">
                                    <div className="inf-item">Total</div>
                                    <div className="inf-item value">{discountedTotal} Kz</div>
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