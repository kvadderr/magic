import {Dispatch, SetStateAction} from 'react';
import {
    notificationModalCopyTheCode,
    notificationModalGetCode, notificationModalOpenServers,
    notificationModalSubTitle, notificationModalWarningMessage
} from "@/shared/constants/modal";
import Link from "next/link";

const NotificationModal = ({onClose}: { onClose: Dispatch<SetStateAction<boolean>> }) => {

    return (
        <div className="modal modalActive">
            <div className=""></div>
            <div className="modalContent mountedStyle modalContentActive">
                <div className="modalBackground"></div>
                <div className="notificationModal">
                    <div className="modalHeader"><h3 className="modalHeaderTitle">Купить серебро</h3>
                        <div className="modal-header-with-close" onClick={() => {
                            onClose(false)
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="Remove cr-fr">
                                    <path id="Shape" fillRule="evenodd" clipRule="evenodd"
                                          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                                          fill="#8774B8"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="description">{notificationModalSubTitle.ru}</div>
                    <p className="copyText">{notificationModalCopyTheCode.ru}</p>
                    <button className="btn lightBtn codeBtn">
                        {notificationModalGetCode.ru}
                    </button>
                    <div className="serviceModalRightContentWarning">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="warningIcon">
                            <g id="Exclamation Mark cr-fr" opacity="0.7">
                                <path id="Shape" fillRule="evenodd" clipRule="evenodd"
                                      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7ZM11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z"
                                      fill="#8774B8"
                                ></path>
                            </g>
                        </svg>
                        <span className="serviceModalRightContentWarningTitle">
                            {notificationModalWarningMessage.ru}
                        </span>
                    </div>
                    <Link href="/servers">
                        <p className="textOpenServers">{notificationModalOpenServers.ru}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default NotificationModal;
