/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { ServersApi } from '@/api/servers/servers.api';
import { UserApi } from '@/api/user/user.api';
import { v4 } from 'uuid';
import { useTranslations } from 'next-intl';

interface ServerSelectionModalProps {
  onClose: () => void;
  token: string;
  userId: number;
  productId: number;
}

const ServerSelectionModal: React.FC<ServerSelectionModalProps> = ({
  onClose,
  token,
  userId,
  productId,
}) => {
  const ref = createRef<HTMLDivElement>();
  const t = useTranslations('Leaderboard.Modal');
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const { result: data } = await ServersApi.getServers({
          Authorization: `Bearer ${token}`,
        });
        setServers(data);
      } catch (error) {
        console.error('Ошибка получения серверов:', error);
      }
    };

    void fetchServers();
  }, [token]);

  const handleServerSelect = (id: number) => {
    setSelectedServerId(id);
  };

  const handleConfirm = async () => {
    if (selectedServerId) {
      try {
        // Вызываем хук для привязки инвентаря к серверу
        await UserApi.linkInventoryToServer(
          token,
          userId,
          productId,
          selectedServerId,
        );

        window.location.reload();
      } catch (error) {
        console.error('Ошибка привязки к серверу:', error);
        alert('Произошла ошибка при привязке к серверу');
      }
    } else {
      alert('Пожалуйста, выберите сервер.');
    }
  };

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
            <h3 className="modalHeaderTitle">{t('title')}</h3>
            <div
              className="modal-header-with-close"
              onClick={() => onClose()}
            >
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
          <div className="selectServer">
            {servers.map((sv) => {
              const id = v4();
              return (
                <Fragment key={id}>
                  <label
                    htmlFor={id}
                    className="radio-label"
                    onClick={() => setSelectedServerId(sv.serverID)}
                  >
                    {sv.name}
                    <input
                      className="radio-input"
                      type="radio"
                      name="server"
                      id={id}
                      defaultChecked={selectedServerId === sv.serverID}
                      readOnly
                    />
                    <span className="custom-radio"></span>
                  </label>
                </Fragment>
              );
            })}
          </div>
          <button className="btn wideBtn lightBtn" onClick={() => handleConfirm()}>
            {t('submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerSelectionModal;
