'use client';
import React, { useEffect, useState } from 'react';
import { UserApi } from '@/api/user/user.api';
import { Gift } from '@/api/user/types';

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
  const experiencePerRub = 5; // Опыт за 1 рубль

  // Расчет опыта на основе баланса
  const experienceGained = balance * experiencePerRub;

  // Массив уровней и необходимого опыта
  const levels = [0, 500, 1500, 3100, 5400, 8600, 12900, 18600, 26000, 35500];

  // Функция для расчета прогресса до следующего уровня
  const calculateProgress = (experience: number, level: number) => {
    const currentLevelExp = levels[level - 1]; // Опыт для текущего уровня
    const nextLevelExp = levels[level] || experience; // Опыт для следующего уровня
    const progress =
      ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return { progress, nextLevelExp };
  };

  const { progress, nextLevelExp } = calculateProgress(experienceGained, level);

  useEffect(() => {
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

    fetchGifts();
  }, [level, token, userId]);

  const handleClaimGift = async (giftId: number) => {
    try {
      await UserApi.linkUserGift(token, userId, giftId);
      console.log(
        `Подарок ${giftId} успешно привязан к пользователю ${userId}.`,
      );
      // Можно обновить состояние или выполнить другие действия
    } catch (error) {
      console.error('Ошибка при привязке подарка:', error);
    }
  };

  return (
    <div
      style={{
        width: '30%',
        height: 'auto',
        maxHeight: '80%',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: '#4b007f',
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        overflowY: 'auto',
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
      <h3 style={{ marginBottom: '10px' }}>Награда за уровни</h3>
      <p style={{ marginBottom: '15px' }}>
        Играйте на MagicRust, чтобы зарабатывать опыт и получать бесплатные
        предметы Rust
      </p>

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
            }}
          >
            <img
              src={`http://localhost:4500/${gift.iconUrl}`}
              alt={gift.name}
              style={{
                width: '90px',
                height: '90px',
                marginRight: '10px',
                flexShrink: 0,
              }}
            />
            <div style={{ flexGrow: 1 }}>
              <span style={{ fontSize: '16px' }}>
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
                  onClick={() => handleClaimGift(gift.id)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#5a9be6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '5px 10px',
                    cursor: 'pointer',
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
