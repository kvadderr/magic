'use client';
import React, { useEffect, useState } from 'react';
import { UserApi } from '@/api/user/user.api';
import ServerSelectionModal from './ServerSelectionModal'; // Импортируем модалку
import { baseURL } from '@/api/instance/instance';
enum Gifts_type {
  item = 'item',
  product = 'product',
  service = 'service',
  privilege = 'privilege',
  set = 'set',
}

export const Inventory = () => {
  const [userGifts, setUserGifts] = useState<any[]>([]);
  const [allGifts, setAllGifts] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false); // Состояние для открытия модалки
  const [selectedGift, setSelectedGift] = useState<any>(null); // Хранит выбранный подарок
  const accessToken = localStorage.getItem('accessToken');

  const fetchUserGifts = async (token: string, userId: number) => {
    if (!token || !userId) return;

    try {
      const gifts = await UserApi.getUserGifts(token, userId);
      setUserGifts(gifts);
    } catch (error) {
      console.error('Ошибка получения подарков пользователя:', error);
    }
  };

  const fetchAllGiftsByLevel = async (level: number, token: string) => {
    try {
      const gifts = await UserApi.getGiftsByLevel(level, token);
      setAllGifts(gifts);
    } catch (error) {
      console.error('Ошибка получения доступных подарков:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      UserApi.getMe(accessToken)
        .then(async (response) => {
          const userId = response.data.id;
          await UserApi.checkUserLevel(accessToken, userId);
          fetchUserGifts(accessToken, userId);
          const level = response.data.lvl;
          fetchAllGiftsByLevel(level, accessToken);
        })
        .catch((error) => {
          console.error('Ошибка получения пользователя:', error);
        });
    }
  }, [accessToken]);

  const getButtonLabel = (giftType: string) => {
    return giftType === Gifts_type.privilege || giftType === Gifts_type.service
      ? 'Активировать'
      : 'Забрать';
  };

  const handleButtonClick = (userGift: any) => {
    setSelectedGift(userGift);
    setModalOpen(true);
  };

  const handleServerSelect = (serverId: number) => {
    // Здесь вы можете обработать получение подарка на выбранном сервере
    alert(
      `Подарок ${selectedGift.giftId} будет получен на сервере с ID ${serverId}`,
    );
  };

  return (
    <div style={{ width: '50%', marginLeft: '380px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ color: 'white' }}>
            <th style={{ padding: '12px' }}>Название</th>
            <th style={{ padding: '12px' }}>Количество</th>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {userGifts.length > 0 &&
            userGifts.map((userGift) => {
              const giftDetails = allGifts.find(
                (gift) => gift.id === userGift.Gifts.id,
              );
              const giftType = giftDetails?.type;
              return (
                <tr
                  key={userGift.giftId}
                  style={{
                    backgroundColor: 'rgba(50, 0, 100, 0.8)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    margin: '5px 0',
                  }}
                >
                  <td
                    style={{
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={`${baseURL}${userGift.Gifts.iconUrl}`}
                      alt={userGift.Gifts.name} // Правильное использование alt
                      style={{
                        width: '85px',
                        height: '85px',
                        marginRight: '8px',
                      }}
                    />
                    {userGift.Gifts.name}
                  </td>
                  <td style={{ padding: '12px' }}>{userGift.amount}</td>
                  <td style={{ padding: '12px' }}>{userGift.Gifts.id}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleButtonClick(userGift)}
                      style={{
                        backgroundColor: '#00bfff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      {getButtonLabel(giftType)}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {isModalOpen && (
        <ServerSelectionModal
          onClose={() => setModalOpen(false)}
          onSelect={handleServerSelect}
          token={accessToken!} // Передаем токен в модалку
        />
      )}
    </div>
  );
};
