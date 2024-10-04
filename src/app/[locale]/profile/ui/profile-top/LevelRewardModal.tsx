'use client';
import React, { useEffect, useState } from 'react';
import { UserApi } from '@/api/user/user.api';
import { Gift } from '@/api/user/types';
import { User } from '@/api/user/types';
import { baseURL } from '@/api/instance/instance';

interface LevelRewardModalProps {
  closeModal: () => void;
  level: number;
  token: string;
  userId: number;
  balance: number;
}

const LevelRewardModal: React.FC<LevelRewardModalProps> = ({
  closeModal,
  level,
  token,
  userId,
  balance,
}) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [userGifts, setUserGifts] = useState<{ giftId: number }[]>([]);
  const [steamId, setSteamId] = useState<string | null>(null);
  const experiencePerRub = 5; // Опыт за 1 рубль

  // Расчет опыта на основе баланса
  const experienceGained = balance * experiencePerRub;

  // Массив уровней и необходимого опыта
  const levels = [
    500, 1000, 1600, 2300, 3200, 4300, 5700, 7400, 9500, 12000, 15100, 18800,
    23200, 28400, 34500, 41600, 49800, 59200, 70000, 82500,
  ];

  const calculateProgress = (experience: number, level: number) => {
    const currentLevelExp = levels[level - 1]; // Опыт для текущего уровня
    const nextLevelExp = levels[level] || experience; // Опыт для следующего уровня
    const progress =
      ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return { progress, nextLevelExp };
  };

  const { progress, nextLevelExp } = calculateProgress(experienceGained, level);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserApi.getMe(token);
        const userData: User = response.data;
        setSteamId(userData.steamId); // Сохраняем steamId
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    const fetchGifts = async () => {
      try {
        const allGifts = await UserApi.getGiftsByLevel(level, token);
        setGifts(allGifts);

        const userGiftsResponse = await UserApi.getUserGifts(token, userId);
        setUserGifts(userGiftsResponse);
      } catch (error) {
        console.error('Ошибка при получении подарков:', error);
      }
    };

    fetchUserData();
    fetchGifts();
  }, [level, token, userId]);

  const handleClaimGift = async (gift: Gift) => {
    try {
      const productIdentifier = gift.nameID || gift.id; // Проверяем, есть ли nameId, если нет, берем id

      await UserApi.linkUserGift(
        token,
        steamId as string,
        String(productIdentifier),
        1,
      ); // Передаем либо nameId, либо id

      window.location.reload();
    } catch (error) {
      console.error('Ошибка при привязке подарка:', error);
    }
  };

  return (
    <div
      style={{
        width: '563px', // Устанавливаем ширину согласно макету
        height: 'auto',
        maxHeight: '80%',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: '#221939',
        color: '#fff',
        padding: '20px',
        borderRadius: '12px', // Скругленные углы
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Тень для модалки
      }}
    >
      <button
        onClick={closeModal}
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
      <h3
        style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}
      >
        Награда за уровни
      </h3>
      <p style={{ marginBottom: '20px', fontSize: '14px' }}>
        Играйте на MagicRust, чтобы зарабатывать опыт и получать бесплатные
        предметы Rust!
      </p>

      {/* Прогресс уровня */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid #2e76e6',
              backgroundColor: '#5a9be6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '22px',
              fontWeight: 'bold',
              position: 'relative',
              zIndex: '2',
            }}
          >
            {level}
          </div>
          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#0a0a23',
              borderRadius: '5px',
              position: 'relative',
              marginBottom: '10px',
              marginLeft: '-25px',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, progress)}%`,
                backgroundColor: '#5a9be6',
                height: '100%',
                borderRadius: '5px',
              }}
            ></div>
            <span
              style={{
                position: 'absolute',
                right: '0',
                top: '-20px',
                fontSize: '12px',
                color: '#ccc',
              }}
            >
              {experienceGained} / {nextLevelExp} exp
            </span>
          </div>
        </div>
      </div>

      {/* Подарки */}
      {gifts.map((gift) => {
        const isGiftClaimed = userGifts.some(
          (userGift) => userGift.giftId === gift.id,
        );
        return (
          <div
            key={gift.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              backgroundColor: '#221939', // Изначальный цвет фона
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Тень для карточек подарков
              transition: 'background-color 0.3s, box-shadow 0.3s', // Плавный переход при наведении
            }}
            // Добавляем обработчик событий для hover
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#140F21'; // Цвет при наведении (исходный цвет для уровня)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#221939'; // Возвращаем изначальный цвет
            }}
          >
            <img
              src={`${baseURL}${gift.iconUrl}`}
              alt={gift.name}
              style={{
                width: '90px',
                height: '90px',
                marginRight: '10px',
                flexShrink: 0,
              }}
            />
            <div style={{ flexGrow: 1 }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {gift.name} (Уровень: {gift.lvl})
              </span>
            </div>
            {gift.available ? (
              isGiftClaimed ? (
                <div
                  style={{
                    marginLeft: '10px',
                    color: '#ccc',
                  }}
                >
                  В инвентаре
                </div>
              ) : (
                <button
                  onClick={() => handleClaimGift(gift)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#5a9be6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Забрать награду
                </button>
              )
            ) : (
              <img
                src="/padlock.png"
                alt="Lock"
                style={{
                  width: '30px',
                  height: '30px',
                  marginLeft: '10px',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LevelRewardModal;
