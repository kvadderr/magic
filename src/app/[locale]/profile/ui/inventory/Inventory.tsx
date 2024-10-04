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
  const [userId, setUserId] = useState<number | null>(null); // Храним userId
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

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
          setUserId(userId); // Устанавливаем userId
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

  // Функция для фильтрации подарков по названию
  const filteredGifts = userGifts.filter((userGift) =>
    userGift.Gifts.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Введите название предмета"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Обновляем состояние для поиска
          style={{
            width: '1058px',
            height: '50px',
            padding: '13px 825px 13px 12px',
            borderRadius: '12px 0px 0px 12px', // Закругленные границы слева
            backgroundColor: '#3A2964',
            color: '#fff',
            border: 'none',
            outline: 'none',
          }}
        />
        <button
          style={{
            width: '210px',
            height: '50px',
            padding: '13px 59px 13px 59px',
            borderRadius: '0px 12px 12px 0px', // Закругленные границы справа
            backgroundColor: '#3A2964',
            color: '#fff',
            border: '2px solid #3A2964',
            cursor: 'pointer',
          }}
          onClick={() => {
            // Обработчик для фильтра
          }}
        >
          Фильтр
        </button>
      </div>

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
          {filteredGifts.length > 0 &&
            filteredGifts.map((userGift, index) => {
              const giftDetails = allGifts.find(
                (gift) => gift.id === userGift.Gifts.id,
              );
              const giftType = giftDetails?.type;

              const backgroundColor = index % 2 === 0 ? '#5A4B78' : '#4A3B66';

              return (
                <tr
                  key={userGift.giftId}
                  style={{
                    backgroundColor, // Цвет в зависимости от индекса
                    color: 'white',
                    borderRadius: '12px',
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
                      alt={userGift.Gifts.name}
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
                    {userGift.server ? (
                      <div>
                        <p>Сервер: {userGift.server.name}</p>
                        <p>IP: {userGift.server.ip}</p>
                      </div>
                    ) : (
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
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {isModalOpen && selectedGift && (
        <ServerSelectionModal
          onClose={() => setModalOpen(false)}
          token={accessToken!}
          userId={userId!}
          productId={selectedGift.giftId}
        />
      )}
    </div>
  );
};
