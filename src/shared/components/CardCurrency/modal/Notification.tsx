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
import {useLocale, useTranslations} from "next-intl";

const NotificationModal = ({onClose}: { onClose: Dispatch<SetStateAction<boolean>> }) => {
  const t = useTranslations("Card.Notification");
  const locale = useLocale();
  return (
    <div className="modal modalActive">
      <div className=""></div>
      <div className="modalContent mountedStyle modalContentActive">
        <div className="modalBackground"></div>
        <div className="notificationModal">
          <div className="modalHeader"><h3 className="modalHeaderTitle">{t("Modal.title")}</h3>
            <div className="modal-header-with-close" onClick={() => {
              onClose(false)
            }}>
              <CloseIcon/>
            </div>
          </div>
          <div className="description">{t("Modal.description")}</div>
          <p className="copyText">{t("Modal.copy_label")}</p>
          <button className="btn lightBtn codeBtn">
            {t("Modal.button")}
          </button>
          <div className="serviceModalRightContentWarning">
            <AlertInfoIcon/>
            <span className="serviceModalRightContentWarningTitle">
              {t("Modal.warning")}
            </span>
          </div>
          <Link href={`/${locale}/servers`}>
            <p className="textOpenServers">{t("Modal.link")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotificationModal;
