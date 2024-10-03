'use client';
import React, { useEffect, useState } from 'react';
import { ServersApi } from '@/api/servers/servers.api'; // Импортируйте ваш API для серверов

interface ServerSelectionModalProps {
  onClose: () => void;
  onSelect: (serverId: number) => void;
  token: string;
}

const ServerSelectionModal: React.FC<ServerSelectionModalProps> = ({
  onClose,
  onSelect,
  token,
}) => {
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null); // Хранит выбранный сервер

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

  const handleConfirm = () => {
    if (selectedServerId) {
      onSelect(selectedServerId);
      alert(`Выбран сервер с ID: ${selectedServerId}`); // Мок-обработчик
      onClose();
    } else {
      alert('Пожалуйста, выберите сервер.');
    }
  };

  return (
    <div
      style={{
        width: '300px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: '#4b007f', // Темно-синий фон
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>Выберите сервер</h3>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '20px',
        }}
      >
        &times;
      </button>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {servers.map((server) => (
          <li
            key={server.serverID}
            style={{
              margin: '10px 0',
              height: '25px',
              display: 'flex',
              paddingLeft: '3px',
              alignItems: 'center',
              border: '1px solid #5a9be6',
              borderRadius: '5px',
              backgroundColor: '#3b3b6b',
            }}
          >
            <label style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              {server.name}
              <input
                type="radio"
                name="server"
                value={server.id}
                checked={selectedServerId === server.serverID}
                onChange={() => handleServerSelect(server.serverID)}
                style={{
                  marginLeft: 'auto', // Перемещаем радиокнопку вправо
                  accentColor: '#5a9be6', // Цвет радиокнопки
                }}
              />
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: '#5a9be6',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '10px', // Отступ сверху для кнопки
        }}
      >
        Подтвердить
      </button>
    </div>
  );
};

export default ServerSelectionModal;
