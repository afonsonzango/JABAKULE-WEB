"use client";

import React, { useState } from 'react'
import Image from "next/image";
import "./styles/style.css";

// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, CircleOff, Heart, Mail, Menu, Minus, Phone, Plus, Printer, Search, ShieldCheck, ShoppingCart, Trash2, User, X } from "lucide-react";

import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import cartimages from "@/assets/midea/aditionals/cart_img.jpg";
import computer from "@/assets/midea/products/computer.png";

import Link from 'next/link';
import NavLink from '../hooks/navlink';

// Drawer element

import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

const Navbar = () => {
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);

  return (
    <header className="main_header">
      <div className="main-assets">
        <div className="container">
          <div className="assets-align-copper">
            <div className="assets-left">
              <div className="logo-item">
                <Image src={logo} alt={"jabakule logo"} priority />
              </div>
            </div>

            <div className="assets-center">
              <button className="input-component" onClick={() => alert()}>
                <div className="icon">
                  <Search />
                </div>
                <div className='sarch-text'>Encontre o que procura...</div>

                {/* Or a direct searcher component, just remove the comment... by Richard */}
                {/* <input type="text" placeholder="Encontre o que procura..." />
                <div className="cleaner-copper">
                  <button className="cursor-pointer">
                    <X />
                  </button>
                </div> */}
              </button>
            </div>

            <div className="assets-right">
              <div className="assets-right-copper">
                <div className="assets-list-item">
                  <span className="assets-money-emout">893,04 Kz</span>

                  <Drawer>
                    <DrawerTrigger asChild>
                      <button className="menu-list-item">
                        <ShoppingCart />
                        <div className="assets-item-counter">99+</div>
                      </button>
                    </DrawerTrigger>
                    <DrawerContent style={{ maxHeight: "90vh", overflowY: "scroll" }} className='drawer-container'>
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
                                  <div className="delete-button">
                                    <Trash2 />
                                  </div>
                                </div>
                                <div className="product mb-4">
                                  <div className="product-image">
                                    <div>
                                      <Image src={computer} alt={"Product image"} />
                                    </div>
                                  </div>
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
                                  <div className="delete-button">
                                    <Trash2 />
                                  </div>
                                </div>
                                <div className="product mb-4">
                                  <div className="product-image">
                                    <div>
                                      <Image src={computer} alt={"Product image"} />
                                    </div>
                                  </div>
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
                                  <div className="delete-button">
                                    <Trash2 />
                                  </div>
                                </div>
                                <div className="product mb-4">
                                  <div className="product-image">
                                    <div>
                                      <Image src={computer} alt={"Product image"} />
                                    </div>
                                  </div>
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
                    </DrawerContent>
                  </Drawer>
                </div>

                <div className="assets-list-item">
                  <button className="menu-list-item">
                    <Heart />
                    <div className="assets-item-counter">99+</div>
                  </button>
                </div>

                <div className="assets-list-item search-item-responsive">
                  <button className="menu-list-item">
                    <Search />
                  </button>
                </div>

                <Link href={"/auth/login"} className="assets-list-item text-left">
                  <div className="menu-list-item">
                    <User />
                  </div>
                  <span className="assets-money-emout auth-text">
                    Login <br />
                    <span className='lighter'>Registro</span>
                  </span>
                </Link>

                {/* <DropdownMenu>
                  <DropdownMenuTrigger style={{ outline: "none" }}>
                    <div className="assets-profile">
                      <div className="profile-name">Ola, <span>afonso!</span></div>
                      <div className="image"></div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="dropdown-menu-restyle">
                    <div className="dropdown-container">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet distinctio animi explicabo unde magni adipisci sint numquam assumenda magnam eveniet mollitia, ipsam eius dolorem temporibus tempora impedit sit commodi sunt!
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="container">
          <div className="main-nav-assets">
            <div className="nav-left-assets">
              <div className="nav-left-assets-copper">
                <div className="selected-category">
                  <Check />
                  Todas as categorias
                </div>

                <div className="nav-actions-list" style={{ left: menuIsOpened ? "0" : "-100%" }}>
                  <ul>
                    <li><NavLink href={"/get-started"} activeClassName={"active"}>Inicio</NavLink></li>
                    <li><NavLink href={"/products"} activeClassName={"active"}>Produtos</NavLink></li>
                    <li><NavLink href={"/salers"} activeClassName={"active"}>Vendedores</NavLink></li>
                    <li><NavLink href={"/stores"} activeClassName={"active"}>Ver Lojas</NavLink></li>
                    <li><NavLink href={"/industrial"} activeClassName={"active"}>Industriais</NavLink></li>
                  </ul>

                  <div className="mobile-session">
                    <div className="title">Informacoes de contacto</div>

                    <ul>
                      <li>
                        <a href="">
                          <Phone />
                          +244 937146346
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <Mail />
                          afonso1.nzango@gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-right-assets">
              <div className="nav-contact mobile-button-icon">
                <button className="icon" onClick={() => setMenuIsOpened((prev) => !prev)}>
                  {menuIsOpened ? <X /> : <Menu />}
                </button>
              </div>

              <div className="nav-contact">
                <div className="text">afonso1.nzango@gmail.com</div>
                <div className="icon">
                  <Mail />
                </div>
              </div>

              <div className="nav-contact">
                <div className="text" style={{ marginTop: 4 }}><span>+244</span> 937146346</div>
                <div className="icon">
                  <Phone />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;