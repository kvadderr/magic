"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import {NavbarModal} from "@/shared/components/NavbarModal/NavbarModal";
import {handleSteamLogin} from "@/shared/hooks/handleSteamLogin";
import BurgerIcon from "@/shared/assets/icons/BurgerIcon";
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {useLocale, useTranslations} from "next-intl";
import {UserData} from "@/api/auth/types";
import {UserApi} from "@/api/user/user.api";

const Navbar = () => {
  const [modal, set] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>();
  const [userBalance, setUserBalance] = useState<number>();
  const {Link, useRouter, usePathname, redirect} = createSharedPathnamesNavigation();
  const path = usePathname();
  const t = useTranslations("Header");
  const locale = useLocale();

  const asyncData = async (token: string) => {
    const {data: {balance}} = await UserApi.getBalance(token);
    setUserBalance(balance)
  }

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    if (userStorage && accessToken) {
      setUser(JSON.parse(userStorage) as UserData)
      asyncData(accessToken)
    }
  }, []);

  useEffect(() => {
    set(false)
  }, [path]);

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
                <Image src="https://storage.yandexcloud.net/magicow-rust/ElectricalPlug.svg" alt="logo" width={200}
                       height={41} className="navbar__icon"/>
                <span>{t("servers")}</span>
              </Link>
              <Link
                locale={locale}
                href="/info"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/Location.svg" alt="logo" width={200}
                       height={41} className="navbar__icon"/>
                <span>{t("information")}</span>
              </Link>
              <Link
                locale={locale}
                href="/leaders"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/Star.svg" alt="logo" width={200} height={41}
                       className="navbar__icon"/>
                <span>{t("leaderboard")}</span>
              </Link>
              <Link
                locale={locale}
                href="/banlist"
                className="navbar__item"
              >
                <Image src="https://storage.yandexcloud.net/magicow-rust/View%20List.svg" alt="logo" width={200}
                       height={41} className="navbar__icon"/>
                <span>{t("ban_list")}</span>
              </Link>
            </nav>
            {
              user ?
                <div className="profile">
                  <div className={!userBalance || userBalance < 1000 ? "balanse balanse-center" : "balanse"} onClick={() => {}}>
                    <span>{userBalance} ₽</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="24 Plus" clipPath="url(#clip0_119_5253)">
                        <path id="Fill 16" fillRule="evenodd" clipRule="evenodd"
                              d="M16.5 13H13V16.5C13 17.05 12.55 17.5 12 17.5C11.45 17.5 11 17.05 11 16.5V13H7.49995C6.94995 13 6.49995 12.55 6.49995 12C6.49995 11.45 6.94995 11 7.49995 11H11V7.49999C11 6.94999 11.45 6.49999 12 6.49999C12.55 6.49999 13 6.94999 13 7.49999V11H16.5C17.05 11 17.5 11.45 17.5 12C17.5 12.55 17.05 13 16.5 13ZM12 0C5.375 0 0 5.375 0 12C0 18.625 5.375 24 12 24C18.625 24 24 18.625 24 12C24 5.375 18.625 0 12 0Z"
                              fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_119_5253">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <Link href="/profile" className="profile__icon" onClick={() => {}}>
                    <img src={user?.avatar} alt="" className="avatar-in-navbar"/>
                  </Link>
                </div> :
                <div className="profile" style={{cursor: 'pointer'}} onClick={handleSteamLogin}>
                  {t("login")}
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
