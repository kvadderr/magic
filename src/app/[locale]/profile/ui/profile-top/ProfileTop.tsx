"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {UserData} from "@/api/auth/types";
import {useTranslations} from "next-intl";

export const ProfileTop = ({tab}: {tab?: "inventory" | "detail"}) => {
  const [user, setUser] = useState<UserData>();
  const t = useTranslations("Profile");

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
      return;
    }
    redirect("/");
  }, []);

  return (
    <div className="profile-top">
      <div className="container profile-top-container">
        <div className="profile-top_inner">
          <div className="left-side">
            <div className="logo">
              <img src={user?.avatar} alt="" className="avatarInProfile"/>
            </div>
            <div className="user">
              <span className="user-name">{user?.name}</span>
              <Link href={`https://steamcommunity.com/profiles/${user?.steamId}`}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                     xmlns="http://www.w3.org/2000/svg" className="steam-logo">
                  <g id="steam-seeklogo.com 1" opacity="0.7">
                    <g id="Group">
                      <path id="Vector"
                            d="M15.9752 2C8.48261 2 2.34463 7.83011 1.76172 15.2386L9.40623 18.4282C10.0538 17.9807 10.8368 17.72 11.6783 17.72C11.7543 17.72 11.8292 17.7221 11.9031 17.7262L15.303 12.753V12.6832C15.303 9.69069 17.7158 7.25541 20.6816 7.25541C23.6475 7.25541 26.0602 9.69069 26.0602 12.6832C26.0602 15.6758 23.6475 18.1121 20.6816 18.1121C20.6406 18.1121 20.6005 18.111 20.5595 18.11L15.7105 21.6003C15.7135 21.6649 15.7156 21.7296 15.7156 21.7932C15.7156 24.0407 13.9043 25.8685 11.6783 25.8685C9.72437 25.8685 8.08956 24.4604 7.72011 22.5968L2.25226 20.3154C3.94557 26.3569 9.44626 30.7862 15.9752 30.7862C23.8527 30.7862 30.238 24.3414 30.238 16.3931C30.238 8.4438 23.8527 2 15.9752 2ZM10.6997 23.8391L8.94791 23.1085C9.25784 23.7612 9.79559 24.3071 10.5088 24.6068C12.0503 25.2554 13.8277 24.5175 14.4701 22.9607C14.7811 22.2074 14.7831 21.3762 14.4753 20.6208C14.1674 19.8655 13.5855 19.2765 12.8394 18.9624C12.0975 18.6515 11.3031 18.6628 10.6053 18.9286L12.4156 19.6839C13.5527 20.1621 14.0904 21.4798 13.6163 22.6272C13.1432 23.7745 11.8368 24.3174 10.6997 23.8391ZM24.2657 12.6833C24.2657 10.6893 22.6575 9.06581 20.682 9.06581C18.7055 9.06581 17.0973 10.6893 17.0973 12.6833C17.0973 14.6773 18.7055 16.2998 20.682 16.2998C22.6575 16.2998 24.2657 14.6773 24.2657 12.6833ZM17.9953 12.6772C17.9953 11.1768 19.2011 9.9607 20.6871 9.9607C22.1742 9.9607 23.38 11.1768 23.38 12.6772C23.38 14.1775 22.1742 15.3937 20.6871 15.3937C19.2011 15.3937 17.9953 14.1775 17.9953 12.6772Z"
                            fill="#8774B8"
                      ></path>
                    </g>
                  </g>
                </svg>
              </Link>
            </div>
          </div>
          <div className="right-side">
            <button className="btn blackBtn exitBtn" onClick={() => {
              localStorage.clear()
              window.location.replace('/')
            }}>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <g id="Login">
                  <path
                    id="Shape"
                    d="M10.5 11H14.0858L12.7929 9.70711C12.4024 9.31658 12.4024 8.68342 12.7929 8.29289C13.1834 7.90237 13.8166 7.90237 14.2071 8.29289L17.2071 11.2929C17.5976 11.6834 17.5976 12.3166 17.2071 12.7071L14.2071 15.7071C13.8166 16.0976 13.1834 16.0976 12.7929 15.7071C12.4024 15.3166 12.4024 14.6834 12.7929 14.2929L14.0858 13H10.5V16.8385C10.5 17.3657 10.5 17.8205 10.5306 18.195C10.5629 18.5904 10.6342 18.9836 10.827 19.362C11.1146 19.9265 11.5735 20.3854 12.138 20.673C12.5164 20.8658 12.9096 20.9371 13.305 20.9694C13.6795 21 14.1343 21 14.6615 21H17.3385C17.8657 21 18.3205 21 18.695 20.9694C19.0904 20.9371 19.4836 20.8658 19.862 20.673C20.4265 20.3854 20.8854 19.9265 21.173 19.362C21.3658 18.9836 21.4371 18.5904 21.4694 18.195C21.5 17.8205 21.5 17.3657 21.5 16.8386V7.16148C21.5 6.63434 21.5 6.17954 21.4694 5.80497C21.4371 5.40963 21.3658 5.01641 21.173 4.63803C20.8854 4.07354 20.4265 3.6146 19.862 3.32698C19.4836 3.13419 19.0904 3.06287 18.695 3.03057C18.3205 2.99997 17.8657 2.99998 17.3386 3H14.6614C14.1343 2.99998 13.6795 2.99997 13.305 3.03057C12.9096 3.06287 12.5164 3.13419 12.138 3.32698C11.5735 3.6146 11.1146 4.07355 10.827 4.63803C10.6342 5.01641 10.5629 5.40963 10.5306 5.80498C10.5 6.17953 10.5 6.63432 10.5 7.16143V11Z"
                    fill="#8774B8"
                  ></path>
                  <path
                    id="Shape_2" fillRule="evenodd" clipRule="evenodd"
                    d="M3.5 12C3.5 12.5523 3.94772 13 4.5 13H10.5V11H4.5C3.94772 11 3.5 11.4477 3.5 12Z"
                    fill="#8774B8"
                  ></path>
                </g>
              </svg>
              <span>{t("logout")}</span></button>
          </div>
        </div>
        <div className="profile-nav">
          <Link href="?tab=inventory"
                style={{fontWeight: 600}}
                className={`profile-nav__btn ${!tab || tab === "inventory" ? "profile-nav__btn__active" : ""}`}>{t("Tabs.inventory")}</Link>
          <Link href="?tab=detail"
                style={{fontWeight: 600}}
                className={`profile-nav__btn ${tab === "detail" ? "profile-nav__btn__active" : ""}`}>{t("Tabs.detail")}</Link>
        </div>
      </div>
    </div>

  )
}