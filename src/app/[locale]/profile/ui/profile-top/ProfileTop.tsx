"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {UserData} from "@/api/auth/types";
import {useTranslations} from "next-intl";
import {ExitIcon, ProgressIcon, SteamIcon} from "@/shared/assets";

export const ProfileTop = ({tab}: { tab?: "inventory" | "detail" }) => {
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div className="user">
                <span className="user-name">{user?.name}</span>
                <Link href={`https://steamcommunity.com/profiles/${user?.steamId}`}>
                  <SteamIcon/>
                </Link>
              </div>
              <div className="level-container">
                <div className="icon-container">
                  <span className="level-number">2</span>
                  <ProgressIcon/>
                </div>
                <div className="level-info">
                  <div style={{zIndex:10, marginLeft: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div className="level-text">Уровень 2</div>
                    <div className="progress-text">3120 / 4210 exp</div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div className="progress" style={{width: `72%`}}></div>
                    </div>
                  </div>
                  <div className="progress-text" style={{alignSelf: 'self-end', color: '#8774B8', cursor: 'pointer'}}>Как это работает?</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <button className="btn blackBtn exitBtn" onClick={() => {
              localStorage.clear()
              window.location.replace('/')
            }}>
              <ExitIcon/>
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
