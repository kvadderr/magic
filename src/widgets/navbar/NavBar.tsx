"use client"
import Image from "next/image";
import {useState} from "react";
import {NavbarModal} from "@/shared/components/NavbarModal/NavbarModal";
import {handleSteamLogin} from "@/shared/hooks/handleSteamLogin";
import BurgerIcon from "@/shared/assets/icons/BurgerIcon";
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {useLocale, useTranslations} from "next-intl";

const Navbar = () => {
  const [modal, set] = useState<boolean>(false);
  const {Link, useRouter, usePathname, redirect} = createSharedPathnamesNavigation();
  const t = useTranslations("Header");
  const locale = useLocale();
  
  return (
    <>
      {modal && <NavbarModal onClose={set}/>}
      <div className="header-plug"/>
      <div className="header">
        <div className="container">
          <div className="header_inner">
            <div className="burgerMenuIcon" style={{cursor: "pointer"}} onClick={() => set(true)}>
              <BurgerIcon/>
            </div>
            <Link href="/" className="logo_img">
              <Image src='/svg/logo.svg' alt='logo' width={200} height={41}/>
            </Link>
            <nav className="navbar">
              <Link
                locale={locale}
                href="/servers"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/ElectricalPlug.svg" alt="logo" width={200} height={41} className="navbar__icon"/>
                <span>{t("servers")}</span>
              </Link>
              <Link
                locale={locale}
                href="/info"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/Location.svg" alt="logo" width={200} height={41} className="navbar__icon"/>
                <span>{t("information")}</span>
              </Link>
              <Link
                locale={locale}
                href="/leaders"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/Star.svg" alt="logo" width={200} height={41} className="navbar__icon"/>
                <span>{t("leaderboard")}</span>
              </Link>
              <Link
                locale={locale}
                href="/banlist"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/View%20List.svg" alt="logo" width={200} height={41} className="navbar__icon"/>
                <span>{t("ban_list")}</span>
              </Link>
            </nav>
            <div className="profile" style={{cursor: 'pointer'}} onClick={handleSteamLogin}>
              {t("login")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
