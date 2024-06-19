"use client"
import { useLeaderboardProvider} from "@/app/[locale]/leaders/api";
import {createRef, Fragment, useEffect, useState} from "react";
import {v4} from "uuid";
import {useTranslations} from "next-intl";
import useOutsideClick from "@/shared/hooks/useOutsideClick";

export const ServersModal = () => {
    const t = useTranslations("Leaderboard.Modal");
    const {
        serversList,
        serverId,
        setServerId,
        setModal
    } = useLeaderboardProvider();
    const ref = createRef<HTMLDivElement>();
    useOutsideClick(ref, setModal);
    const [serverIdTemp, set] = useState(serverId);

    function emit() {
        setServerId(serverIdTemp);
        setModal(false);
    }

    return (
        <div className="modal modalActive" style={{zIndex: 100}}>
            <div
                style={{width: "100%", height: "100%", position: "fixed", top: "0px", right: "0px"}}
            ></div>
            <div ref={ref} className="modalContent mountedStyle modalContentActive undefined">
                <div className="modalBackground"></div>
                <div className="selectServerModal">
                    <div className="modalHeader">
                        <h3 className="modalHeaderTitle">{t("title")}</h3>
                        <div className="modal-header-with-close" onClick={() => setModal(false)}>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd" clipRule="evenodd"
                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293z"
                                    fill="#8774B8"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="selectServer">
                        {
                            serversList.map(sv => {
                                const id = v4();
                                return (
                                    <Fragment key={id}>
                                        <label htmlFor={id} className="radio-label" onClick={() => set(sv.serverID)}>
                                            {sv.name}
                                            <input className="radio-input" type="radio" name="server" id={id}
                                                   defaultChecked={serverIdTemp === sv.serverID} readOnly
                                            />
                                            <span className="custom-radio"></span>
                                        </label>
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                    <button className="btn wideBtn lightBtn" onClick={() => emit()}>{t("submit")}</button>
                </div>
            </div>
        </div>
    )
}
