/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { createRef, Fragment, useState } from 'react';
import { UserApi } from '@/api/user/user.api'; // Импортируйте UserApi
import './transfer-modal.scss';
import { v4 } from 'uuid';
import { RubbleIcon } from '@/shared/assets';
import {useTranslations} from "next-intl";

interface TransferModalProps {
  onClose: () => void;
  balance: number;
  token: string;
  steamID: string;
}

const TransferModal: React.FC<TransferModalProps> = ({
  onClose,
  balance,
  token,
  steamID,
}) => {
  const t= useTranslations("Profile.Table.TransferModal");
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const ref = createRef<HTMLDivElement>();

  const handleTransfer = async () => {
    setError(null); // Сбрасываем ошибки перед началом передачи

    if (amount <= 0) {
      setError(t("sum_zero"));
      return;
    }
    if (amount > balance) {
      setError(t("no_money"));
      return;
    }

    try {
      await UserApi.transferFunds(token, steamID, recipient, amount); // Здесь укажите свой senderSteamId
      alert(`${t("transfer_l")}: ${amount} ${t("transfer_r")} ${recipient}`);
      onClose();
    } catch (err) {
      setError(err + t("transfer_error"));
    }
  };

  const isTransferButtonDisabled =
    !recipient || amount <= 0 || amount > balance;

  return (
    <div className="modal modalActive" style={{ zIndex: 1000 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0px',
          right: '0px',
        }}
      ></div>
      <div
        ref={ref}
        className="modalContent mountedStyle modalContentActive undefined"
      >
        <div className="modalBackground"></div>
        <div className="selectServerModal">
          <div className="modalHeader">
            <h3 className="modalHeaderTitle">{t("transfer_title")}</h3>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div className="modal-header-with-close" onClick={() => onClose()}>
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293z"
                  fill="#8774B8"
                />
              </svg>
            </div>
          </div>
          <p className="transfer-modal__subtitle">
            {t("can_transfer")}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7ZM11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z" fill="#8774B8"/>
              </g>
            </svg>
          </p>
          <p className="transfer-modal__sum-title">{balance} ₽</p>
          <form className='transfer-modal__form'>
            <fieldset>
              <p className="transfer-modal__label">{t("user")}</p>
              <div className="inputSumWrap transfer-modal__input">
                <input
                  onClick={() => {}}
                  type="text"
                  placeholder={t("input_steam")}
                  value=""
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <p className="transfer-modal__label">{t("input_sum")}</p>
              <div className="inputSumWrap transfer-modal__input">
                <input
                  onClick={() => {}}
                  type="text"
                  placeholder={t("input_sum")}
                  value=""
                  onChange={(e) =>
                    setAmount(e.target.value ? parseFloat(e.target.value) : 0)
                  }
                />
                <RubbleIcon />
              </div>
              <p className="transfer-modal__sublabel">
                {t("min_sum")}
              </p>
            </fieldset>
            <p className="transfer-modal__warning">
              {t("max_sum")}
            </p>
            <button disabled={isTransferButtonDisabled} type="button" className={`btn wideBtn lightBtn`} onClick={handleTransfer}>
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
