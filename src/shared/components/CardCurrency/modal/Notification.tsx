import {createRef, Dispatch, SetStateAction, useEffect, useState} from 'react';
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
import {InformationApi} from "@/api/information/information.api";
import useOutsideClick from "@/shared/hooks/useOutsideClick";

const NotificationModal = ({onClose}: { onClose: Dispatch<SetStateAction<boolean>> }) => {
  const [contacts, setContacts] = useState<any>([]);
  const ref = createRef<HTMLDivElement>();
  useOutsideClick(ref, onClose);
  const asyncData = async () => {
    const {data} = await InformationApi.getContactsForNotices();
    setContacts(data)
  }

  useEffect(() => {
    asyncData()
  }, []);

  const t = useTranslations("Card.Notification");
  const locale = useLocale();
  return (
    <div className="modal modalActive">
      <div className=""></div>
      <div ref={ref} className="modalContent mountedStyle modalContentActive">
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

          <div className="boxButtons">
            { // @ts-ignore
              contacts?.map((it, index) => (
                <Link href={it.url} target="_blank" key={index}>
                  <button className="btn blackBtn netWorkBtn">
                    <img src={it.icon} alt="" className="iconInBtn"/>
                    <p>
                      {t("Modal.bind")} {it.name}
                    </p>
                  </button>
                </Link>
              ))
            }
          </div>
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
