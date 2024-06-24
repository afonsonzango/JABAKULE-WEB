"use client";

import React, { useState } from 'react'
import Image from "next/image";
import "./styles/style.css";

// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, Heart, Mail, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";

import logo from "@/assets/midea/logo-icon/logo-jabakule-307x83.png";
import Link from 'next/link';
import NavLink from '../hooks/navlink';

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
                  <button className="menu-list-item">
                    <ShoppingCart />
                    <div className="assets-item-counter">99+</div>
                  </button>
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

                <div className="nav-actions-list" style={{left: menuIsOpened ? "0" : "-100%"}}>
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