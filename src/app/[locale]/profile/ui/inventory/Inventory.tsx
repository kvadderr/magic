'use client';
import React, { useState } from 'react';
import ServerSelectionModal from './ServerSelectionModal';
import { baseURL } from '@/api/instance/instance';

export const Inventory = ({
  userGifts,
  allGiftsByLevel,
  userId,
}: {
  userGifts: any[];
  allGiftsByLevel: any[];
  userId: number;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getButtonLabel = (giftType: string) => {
    return giftType === 'privilege' || giftType === 'service'
      ? 'Активировать'
      : 'Забрать';
  };

  const handleButtonClick = (userGift: any) => {
    setSelectedGift(userGift);
    setModalOpen(true);
  };

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
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '1058px',
            height: '50px',
            padding: '13px 825px 13px 12px',
            borderRadius: '12px 0px 0px 12px',
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
            borderRadius: '0px 12px 12px 0px',
            backgroundColor: '#3A2964',
            color: '#fff',
            border: '2px solid #3A2964',
            cursor: 'pointer',
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
              const giftDetails = allGiftsByLevel.find(
                (gift) => gift.id === userGift.Gifts.id,
              );
              const giftType = giftDetails?.type;

              const backgroundColor = index % 2 === 0 ? '#5A4B78' : '#4A3B66';

              return (
                <tr
                  key={userGift.giftId}
                  style={{
                    backgroundColor,
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
                      // Отображение информации о сервере, если он есть
                      <div>
                        <p>Сервер: {userGift.server.name}</p>
                        <p>IP: {userGift.server.ip}</p>
                      </div>
                    ) : (
                      // Кнопка, если сервера нет
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
          token={localStorage.getItem('accessToken')!}
          userId={userId}
          productId={selectedGift.giftId}
        />
      )}
    </div>
  );
};
