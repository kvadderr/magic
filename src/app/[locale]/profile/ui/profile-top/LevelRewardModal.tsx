'use client';
import React, { useEffect, useState } from 'react';
import { UserApi } from '@/api/user/user.api';
import { Gift } from '@/api/user/types';
import { User } from '@/api/user/types';
import { baseURL } from '@/api/instance/instance';
import './level-reward.scss';
import { LevelProgress } from '@/shared/components/LevelProgress/LevelProgress';

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

    void fetchUserData();
    void fetchGifts();
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
    <div className="level-reward__overlay">
      <div className="level-reward__modal">
        <div className="level-reward__heading">
          <button onClick={closeModal} className="level-reward__close">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Remove cr-fr">
                <path
                  id="Shape"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                  fill="#8774B8"
                ></path>
              </g>
            </svg>
          </button>
          <h3 className="level-reward__title">Награда за уровни</h3>
          <p className="level-reward__subtitle">
            Играйте на MagicRust, чтобы зарабатывать опыт <br /> и получать
            предметы Rust!
          </p>

          {/* Прогресс уровня */}
          <LevelProgress
            variant="small"
            currentLevel={level}
            progress={progress}
            experience={experienceGained}
            nextLevelExp={nextLevelExp}
          />
        </div>
        {/* Подарки */}
        <div className="level-reward__content">
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
                  marginBottom: '20px',
                  backgroundColor: '#221939', // Изначальный цвет фона
                  borderRadius: '12px',
                }}
              >
                <div className="level-reward__preview">
                  <img
                    src={`${baseURL}${gift.iconUrl}`}
                    alt={gift.name}
                    style={{
                      width: '102px',
                      height: '102px',
                    }}
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {gift.name} Уровень: {gift.lvl}
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
                      className="lightBtn btn oneColumnBtn level-reward__claim"
                      onClick={() => handleClaimGift(gift)}
                    >
                      Забрать награду
                    </button>
                  )
                ) : (
                  <img
                    src="/svg/lock.svg"
                    alt="Lock"
                    style={{
                      width: '40px',
                      height: '40px',
                      marginLeft: '10px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelRewardModal;
