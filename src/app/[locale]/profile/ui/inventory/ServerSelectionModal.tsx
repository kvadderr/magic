/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { ServersApi } from '@/api/servers/servers.api';
import { UserApi } from '@/api/user/user.api';

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

    fetchServers();
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
    <div
      style={{
        width: '470px',
        height: '548px',
        position: 'fixed',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: '#221939', // Уровень всей модалки
        color: '#FFFFFF',
        padding: '20px',
        borderRadius: '12px 0px 0px 0px', // Скругление углов
        boxShadow: `
          -0.64px 1.74px 6.38px 0px #0C0C180C,
          -2.8px 7.65px 13.2px 0px #0C0C1814,
          -6.86px 18.79px 26.33px 0px #0C0C181A,
          -13.22px 36.18px 51.6px 0px #0C0C181F,
          -22.25px 60.88px 94.88px 0px #0C0C1827,
          -34.32px 93.93px 162px 0px #0C0C1833`, // Множественные тени
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#FFFFFF' }}>Выберите сервер</h3>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          color: '#FFFFFF',
          fontSize: '20px',
        }}
      >
        &times;
      </button>

      {/* Блок с серверами имеет скролл, который смещен правее */}
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '20px', // Отступ до кнопки "Подтвердить"
          paddingRight: '10px', // Смещаем скролл правее
        }}
      >
        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
          {servers.map((server) => (
            <li
              key={server.serverID}
              style={{
                margin: '10px 0',
                width: '406px',
                height: '50px',
                padding: '15px 12px 16px 12px',
                gap: '0px',
                borderRadius: '12px 0px 0px 0px', // Скругление углов
                backgroundColor: '#140F21', // Фон для каждого сервера
                display: 'flex',
                alignItems: 'center',
                border: '1px solid transparent', // Изначально прозрачная граница
                transition: 'border-color 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={
                (e) => (e.currentTarget.style.borderColor = '#5A9BE6') // Фиолетовая граница при наведении
              }
              onMouseLeave={
                (e) => (e.currentTarget.style.borderColor = 'transparent') // Прозрачная граница при уходе курсора
              }
              onClick={() => handleServerSelect(server.serverID)}
            >
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                {server.name}
                <input
                  type="radio"
                  name="server"
                  value={server.serverID}
                  checked={selectedServerId === server.serverID}
                  onChange={() => handleServerSelect(server.serverID)}
                  style={{
                    marginLeft: 'auto', // Перемещаем радиокнопку вправо
                    accentColor: '#5A9BE6', // Цвет радиокнопки
                  }}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Кнопка всегда видна внизу */}
      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: '#3B82F6', // Цвет кнопки
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Подтвердить
      </button>
    </div>
  );
};

export default ServerSelectionModal;
