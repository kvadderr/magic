import Link from 'next/link';
import Image from "next/image";

import {menu} from "@/shared/constants/menu";
import './style.scss'

const Navbar = () => {
  return (
    <>
      <div className="header-plug"/>
      <div className="header">
        <div className="container">
          <div className="header_inner">
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
            <div className="profile" style={{cursor: 'pointer'}}>
              Войти
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
