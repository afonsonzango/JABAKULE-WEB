"use client";

import "./styles/style.css";
import Link from 'next/link';
import Image from "next/image";
import Cookies from 'js-cookie';
import React, { lazy, Suspense, useEffect, useState } from 'react';

import NavLink from '../hooks/navlink';
import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, BarChart, CalendarDays, Check, Coins, Heart, HelpingHand, Mail, Menu, Notebook, Phone, Search, ShoppingCart, User, Verified, X } from "lucide-react";

// Drawer imports dependeces
import WaveLoader from '../wave-loader/wave-loader';
import axiosAuthed from '../hooks/axiosInstances/axiosAuth';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePrice } from "@/app/layout";

const CartComponent = lazy(() => import('./cartComponent'));

const Navbar = () => {
  const { price, setPrice } = usePrice();
  const { nProducts, setNProducts } = usePrice();
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState({
    name: "",
    role: ""
  });

  const calculateTotalPrice = React.useCallback(() => {
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
  }, [setPrice]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  useEffect(() => {
    setIsLoading(true);

    const verifyToken = async () => {
      try {
        const token = Cookies.get('token');

        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const response = await axiosAuthed.post(`/user/auth/status`, {}, {
          headers: {
            token: token
          }
        });

        setUser({
          name: response.data._user.name,
          role: response.data._user.role,
        })

        if (response.data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          Cookies.remove('token');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  const handleMobileNav = () => {
    setTimeout(() => {
      setMenuIsOpened(false);
    }, 1000);
  }

  // Traz todos incluindo com o quantity ------------ 
  // const calculateTotalProducts = () => {
  //   let cart:any = localStorage.getItem('cart');

  //   if (!cart) {
  //     cart = {};
  //   } else {
  //     cart = JSON.parse(cart);
  //   }

  //   const total :any = Object.keys(cart).reduce((sum, key) => {
  //     const product :any = cart[key];
  //     return sum + product.quantity;
  //   }, 0);

  //   setNProducts(total);
  // };

  // Traz todos incluindo com sem o quantity ------------ 
  const calculateTotalProducts = React.useCallback(() => {
    let cart: any = localStorage.getItem('cart');

    if (!cart) {
      cart = {};
    } else {
      cart = JSON.parse(cart);
    }

    // Contar o número de diferentes tipos de produtos
    const total = Object.keys(cart).length;
    setNProducts(total);
  }, [setNProducts]);

  useEffect(() => {
    calculateTotalProducts();
  }, [calculateTotalProducts]);

  const suspesedComponent = (Component: any) => (
    <Suspense fallback={
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 60,
        marginBottom: 60,
      }}>
        <WaveLoader />
      </div>}>
      <Component />
    </Suspense>
  );

  if (isLoading) {
    return <div></div>;
  }

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
                  <span className="assets-money-emout">{price} Kz</span>

                  <Drawer>
                    <DrawerTrigger asChild>
                      <button className="menu-list-item">
                        <ShoppingCart />
                        {nProducts > 0 && <div className="assets-item-counter" style={{ minWidth: 20 }}>{nProducts}</div>}
                      </button>
                    </DrawerTrigger>
                    <DrawerContent style={{ maxHeight: "90vh", overflowY: "scroll" }} className='drawer-container'>
                      {suspesedComponent(CartComponent)}
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

                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger style={{ outline: "none" }}>
                      <div className="assets-profile">
                        <div className="profile-name">Ola, <span>{user.name.split(' ')[0]}</span></div>
                        <div className="image">
                          <Image src={"https://media.allure.com/photos/618153bc590337268c4b06fd/16:9/w_1600,c_limit/My%20Beautiful%20Black%20Hair%201.jpg"} alt="Profile picture" width={36} height={36} />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dropdown-menu-restyle">
                      <div className="dropdown-profile">
                        <div className="dropdown-profile-center">
                          <div className="profile-image">
                            <div className="profile-image-copper">
                              <Image src={"https://media.allure.com/photos/618153bc590337268c4b06fd/16:9/w_1600,c_limit/My%20Beautiful%20Black%20Hair%201.jpg"} alt="Profile picture" width={80} height={80} />
                            </div>
                            {user.role === "saler" && <div className="profile-types"> <Verified /></div>}
                          </div>
                          <div className="profile-inf">
                            <div className="profile-name">{user.name}</div>
                            {/* <div className="profile-title">Programador Full-Stack</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-actions">
                        <ul>
                          <li>
                            <a href="">
                              <CalendarDays />
                              Billing
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <BarChart />
                              Status page
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <Notebook />
                              Workspace settings
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <HelpingHand />
                              Help center
                            </a>
                          </li>
                        </ul>
                        <ul className="danger-section">
                          <li>
                            <a href="">
                              <Coins />
                              For time session disable
                            </a>
                          </li>
                          <Dialog>
                            <DialogTrigger>
                              <li>
                                <a>
                                  <ArrowLeft />
                                  Terminar sessao
                                </a>
                              </li>
                            </DialogTrigger>
                            <DialogContent style={{ width: "calc(100% - 40px)", borderRadius: 10 }}>
                              <div className="end-session-config">
                                <div className="title">Tem certeza que deseja sair?</div>
                                <div className="description">Esta ação não pode ser desfeita. Isto irá terminar sua sessão.</div>

                                <div className="actions">
                                  <DialogClose asChild>
                                    <button className="log-out-btn">Cancelar</button>
                                  </DialogClose>
                                  <button onClick={handleLogout} className="log-cancel">Terminar Sessao</button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </ul>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={"/auth/login"} className="assets-list-item text-left">
                    <div className="menu-list-item">
                      <User />
                    </div>
                    <span className="assets-money-emout auth-text">
                      Login <br />
                      <span className='lighter'>Registro</span>
                    </span>
                  </Link>
                )}
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
                    <li><NavLink href={"/get-started"} activeClassName={"active"} onClick={handleMobileNav}>Inicio</NavLink></li>
                    <li><NavLink href={"/products"} activeClassName={"active"} onClick={handleMobileNav}>Produtos</NavLink></li>
                    <li><NavLink href={"/salers"} activeClassName={"active"} onClick={handleMobileNav}>Vendedores</NavLink></li>
                    <li><NavLink href={"/stores"} activeClassName={"active"} onClick={handleMobileNav}>Ver Lojas</NavLink></li>
                    <li><NavLink href={"/industrial"} activeClassName={"active"} onClick={handleMobileNav}>Industriais</NavLink></li>
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