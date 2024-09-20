"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {UserData} from "@/api/auth/types";
import {useTranslations} from "next-intl";
import {ExitIcon, ProgressIcon, SteamIcon} from "@/shared/assets";
import LevelDetail from "@/app/[locale]/profile/ui/detail/LevelDetail";
import {PaymentRewardModal} from "@/app/[locale]/profile/ui/paymentReward-modal/paymentRewardModal";

export const ProfileTop = ({tab}: { tab?: "inventory" | "detail" }) => {
  const [user, setUser] = useState<UserData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
              
            </div>
          </div>
          <div className="level-info-mobile">
            <LevelDetail open={() => setIsOpen(true)}/>
          </div>
          <div className="right-side">
            <button className="btn blackBtn exitBtn" onClick={() => {
              localStorage.clear()
              window.location.replace('/')
            }}>
              <ExitIcon/>
              <span>{t("logout")}</span>
            </button>
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
      {isOpen && <PaymentRewardModal closeModal={() => setIsOpen(false)} />}
    </div>
  
  )
}
