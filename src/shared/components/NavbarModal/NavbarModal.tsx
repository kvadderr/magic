import ModalPortal from "@/shared/components/ModalPortal/ModalPortal";
import {createRef, Dispatch, SetStateAction} from "react";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";
import useOutsideClick from "@/shared/hooks/useOutsideClick";

export const NavbarModal = ({onClose}: { onClose: Dispatch<SetStateAction<boolean>> }) => {
    const t = useTranslations("Header");
    const ref = createRef<HTMLDivElement>();
    useOutsideClick(ref, onClose);
    const locale = useLocale();

    return (
        <ModalPortal>
            <div className="blurBackgroundColor"></div>
            <div className="blurBackground"></div>
            <div ref={ref} className="sidebar sidebarActive">
                <div className="sidebarContainer">
                    <div className="sidebarTop">
                        <div className="sidebarLogoBlock">
                            <div style={{lineHeight: "0", cursor: "pointer"}} onClick={() => onClose(false)}>
                                <svg width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="Remove cr-fr">
                                        <path id="Shape" fillRule="evenodd" clipRule="evenodd"
                                              d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                                              fill="white"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <Link className="sidebarLogoImg" href={`/${locale}/`}>
                                <Image src="/svg/logo.svg" width={125.5} height={25.59} alt="Logotype" id="logoMobile"/>
                            </Link>
                        </div>
                        <nav className="sidebarNavbar">
                            <Link className="sidebarNavbarItem" href={`/${locale}/servers`}>
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/ElectricalPlug.svg"
                                       className="sidebarNavbarIcon"/>
                                <span>{t("servers")}</span>
                            </Link>
                            <Link className="sidebarNavbarItem" href={`/${locale}/info`}>
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/Location.svg"
                                       className="sidebarNavbarIcon"/>
                                <span>{t("information")}</span></Link>
                            <Link className="sidebarNavbarItem" href={`/${locale}/leaders`}>
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/Star.svg"
                                       className="sidebarNavbarIcon"/>
                                <span>{t("leaderboard")}</span></Link>
                            <Link className="sidebarNavbarItem" href={`/${locale}/banlist`}>
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/View%20List.svg"
                                       className="sidebarNavbarIcon"/>
                                <span>{t("ban_list")}</span>
                            </Link>
                        </nav>
                    </div>
                    <div className="sidebarBottom">
                        <div className="contactsMobile">
                            <a href="https://vk.com/magicowrust" target="_blank"
                               className="contacts_item">
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/VK.svg"
                                       className="icon-contact"
                                />
                            </a>
                            <a href="https://discord.gg/magicrust" target="_blank"
                               className="contacts_item">
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/Discord.svg"
                                       className="icon-contact"
                                />
                            </a>
                            <a href="https://t.me/magicrust" target="_blank"
                               className="contacts_item">
                                <Image alt="" width={24} height={24}
                                       src="https://storage.yandexcloud.net/magicow-rust/tg.svg"
                                       className="icon-contact"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ModalPortal>
    )
}