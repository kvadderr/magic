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
                  <Link className={!userBalance || userBalance < 1000 ? "balanse balanse-center" : "balanse"} href="/deposit">
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
                  </Link>
                  <Link href="/profile" className="profile__icon" onClick={() => {
                  }}>
                    <img src={user?.avatar} alt="" className="avatar-in-navbar"/>
                  </Link>
                </div> :
                <div className="profile" style={{cursor: 'pointer'}} onClick={handleSteamLogin}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                       className="steam-logo">
                    <g id="steam-seeklogo.com 1" opacity="0.7">
                      <g id="Group">
                        <path id="Vector"
                              d="M15.9752 2C8.48261 2 2.34463 7.83011 1.76172 15.2386L9.40623 18.4282C10.0538 17.9807 10.8368 17.72 11.6783 17.72C11.7543 17.72 11.8292 17.7221 11.9031 17.7262L15.303 12.753V12.6832C15.303 9.69069 17.7158 7.25541 20.6816 7.25541C23.6475 7.25541 26.0602 9.69069 26.0602 12.6832C26.0602 15.6758 23.6475 18.1121 20.6816 18.1121C20.6406 18.1121 20.6005 18.111 20.5595 18.11L15.7105 21.6003C15.7135 21.6649 15.7156 21.7296 15.7156 21.7932C15.7156 24.0407 13.9043 25.8685 11.6783 25.8685C9.72437 25.8685 8.08956 24.4604 7.72011 22.5968L2.25226 20.3154C3.94557 26.3569 9.44626 30.7862 15.9752 30.7862C23.8527 30.7862 30.238 24.3414 30.238 16.3931C30.238 8.4438 23.8527 2 15.9752 2ZM10.6997 23.8391L8.94791 23.1085C9.25784 23.7612 9.79559 24.3071 10.5088 24.6068C12.0503 25.2554 13.8277 24.5175 14.4701 22.9607C14.7811 22.2074 14.7831 21.3762 14.4753 20.6208C14.1674 19.8655 13.5855 19.2765 12.8394 18.9624C12.0975 18.6515 11.3031 18.6628 10.6053 18.9286L12.4156 19.6839C13.5527 20.1621 14.0904 21.4798 13.6163 22.6272C13.1432 23.7745 11.8368 24.3174 10.6997 23.8391ZM24.2657 12.6833C24.2657 10.6893 22.6575 9.06581 20.682 9.06581C18.7055 9.06581 17.0973 10.6893 17.0973 12.6833C17.0973 14.6773 18.7055 16.2998 20.682 16.2998C22.6575 16.2998 24.2657 14.6773 24.2657 12.6833ZM17.9953 12.6772C17.9953 11.1768 19.2011 9.9607 20.6871 9.9607C22.1742 9.9607 23.38 11.1768 23.38 12.6772C23.38 14.1775 22.1742 15.3937 20.6871 15.3937C19.2011 15.3937 17.9953 14.1775 17.9953 12.6772Z"
                              fill="white "
                        ></path>
                      </g>
                    </g>
                  </svg>
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
