"use client"
import Link from 'next/link';
import Image from "next/image";

import {menu} from "@/shared/constants/menu";
import {useState} from "react";
import {NavbarModal} from "@/shared/components/NavbarModal/NavbarModal";
import {handleSteamLogin} from "@/shared/hooks/handleSteamLogin";

const Navbar = () => {
    const [modal, set] = useState<boolean>(false);

    return (
        <>
            {modal && <NavbarModal onClose={set}/>}
            <div className="header-plug"/>
            <div className="header">
                <div className="container">
                    <div className="header_inner">
                        <div className="burgerMenuIcon" style={{cursor: "pointer"}} onClick={() => set(true)}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                                 className="">
                                <g id="ic_menu_36px 1">
                                    <g id="Group">
                                        <path id="Vector"
                                              d="M3 24C3 24.8284 3.67157 25.5 4.5 25.5H27.5C28.3284 25.5 29 24.8284 29 24C29 23.1716 28.3284 22.5 27.5 22.5H4.5C3.67157 22.5 3 23.1716 3 24ZM3 16C3 16.8284 3.67157 17.5 4.5 17.5H27.5C28.3284 17.5 29 16.8284 29 16C29 15.1716 28.3284 14.5 27.5 14.5H4.5C3.67157 14.5 3 15.1716 3 16ZM4.5 6.5C3.67157 6.5 3 7.17157 3 8C3 8.82843 3.67157 9.5 4.5 9.5H27.5C28.3284 9.5 29 8.82843 29 8C29 7.17157 28.3284 6.5 27.5 6.5H4.5Z"
                                              fill="white"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <Link href="/" className="logo_img">
                            <Image src='/svg/logo.svg' alt='logo' width={200} height={41}/>
                        </Link>
                        <nav className="navbar">
                            {menu.map((item) => (
                                <Link
                                    href={item.link}
                                    className="navbar__item"
                                    key={item.id}
                                >
                                    <Image src={item.icon} alt="logo" width={200} height={41} className="navbar__icon"/>
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="profile" style={{cursor: 'pointer'}} onClick={handleSteamLogin}>
                            Войти
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
