import {Dispatch, SetStateAction} from 'react';
import {
  notificationModalCopyTheCode,
  notificationModalGetCode,
  notificationModalOpenServers,
  notificationModalSubTitle,
  notificationModalWarningMessage
} from "@/shared/constants/modal";
import Link from "next/link";
import {AlertInfoIcon, CloseIcon} from "@/shared/assets";

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
              <CloseIcon/>
            </div>
          </div>
          <div className="description">{notificationModalSubTitle.ru}</div>
          <p className="copyText">{notificationModalCopyTheCode.ru}</p>
          <button className="btn lightBtn codeBtn">
            {notificationModalGetCode.ru}
          </button>
          <div className="serviceModalRightContentWarning">
            <AlertInfoIcon/>
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
