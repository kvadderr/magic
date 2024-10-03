/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ExitIcon, SteamIcon } from '@/shared/assets';
import { PaymentRewardModal } from '@/app/[locale]/profile/ui/paymentReward-modal/paymentRewardModal';
import LevelRewardModal from './LevelRewardModal'; // Импортируем новый компонент
import { UserApi } from '@/api/user/user.api';
import { UserData } from '@/api/auth/types';

export const ProfileTop = ({ tab }: { tab?: 'inventory' | 'detail' }) => {
  const [user, setUser] = useState<UserData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLevelRewardOpen, setIsLevelRewardOpen] = useState<boolean>(false); // Для модалки наград
  const t = useTranslations('Profile');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      UserApi.getMe(token)
        .then((response: any) => {
          setUser(response.data);
        })
        .catch(() => {
          redirect('/');
        });
    } else {
      redirect('/');
    }
  }, []);

  // Курс опыта: 1 рубль = 5 опыта
  const experiencePerRub = 5;
  const levels = [
    500, 1000, 1600, 2300, 3200, 4300, 5700, 7400, 9500, 12000, 15100, 18800,
    23200, 28400, 34500, 41600, 49800, 59200, 70000, 82500,
  ];

  // Функция для расчета текущего уровня
  const calculateLevel = (experience: number) => {
    let level = 1;
    for (let i = 0; i < levels.length; i++) {
      if (experience >= levels[i]) {
        level = i + 1;
      } else {
        break;
      }
    }
    return level;
  };

  // Функция для расчета прогресса до следующего уровня
  const calculateProgress = (experience: number, level: number) => {
    const currentLevelExp = levels[level - 1]; // Опыт для текущего уровня
    const nextLevelExp = levels[level] || experience; // Опыт для следующего уровня
    const progress =
      ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return { progress, currentLevelExp, nextLevelExp };
  };

  // Расчёт опыта на основе основного баланса
  const experience = (user?.balance ?? 0) * experiencePerRub;

  // Определение уровня и прогресса
  const currentLevel = calculateLevel(experience);
  const { progress, nextLevelExp } = calculateProgress(
    experience,
    currentLevel,
  );

  return (
    <div className="profile-top">
      <div className="container profile-top-container">
        <div className="profile-top_inner">
          <div
            className="left-side"
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <div
              className="logo"
              style={{
                height: '120px',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <img
                src={user?.avatar}
                alt=""
                className="avatarInProfile"
                style={{ height: '100%', borderRadius: '50%' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingLeft: '20px',
              }}
            >
              {/* Имя пользователя и значок Steam */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                <span
                  className="user-name"
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginRight: '10px',
                  }}
                >
                  {user?.name
                    ? user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)
                    : ''}
                </span>
                <Link
                  href={`https://steamcommunity.com/profiles/${user?.steamId}`}
                >
                  <SteamIcon />
                </Link>
              </div>

              {/* Круг с уровнем и прогресс */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: '10px',
                }}
              >
                {/* Кругляшок с уровнем */}
                <div
                  onClick={() => setIsLevelRewardOpen(true)} // Открытие модалки при клике
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '3px solid #2e76e6',
                    backgroundColor: '#5a9be6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '2',
                    color: '#fff',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                    cursor: 'pointer', // Указатель для кликабельного элемента
                  }}
                >
                  {currentLevel}
                </div>

                {/* Текст "Уровень X" и полоска прогресса */}
                <div style={{ flexGrow: 1 }}>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#bbb',
                      marginBottom: '5px',
                      display: 'block',
                    }}
                  >
                    {'Уровень'} {currentLevel}
                  </span>
                  <div
                    style={{
                      marginLeft: '-34px',
                      width: '700px',
                      height: '10px',
                      backgroundColor: '#0a0a23',
                      borderRadius: '5px',
                      marginBottom: '8px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
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
                      {experience} / {nextLevelExp} exp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка выхода */}
          <div className="right-side">
            <button
              className="btn blackBtn exitBtn"
              onClick={() => {
                localStorage.clear();
                window.location.replace('/');
              }}
            >
              <ExitIcon />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>

        {/* Табы */}
        <div className="profile-nav">
          <Link
            href="?tab=inventory"
            style={{ fontWeight: 600 }}
            className={`profile-nav__btn ${!tab || tab === 'inventory' ? 'profile-nav__btn__active' : ''}`}
          >
            {t('Tabs.inventory')}
          </Link>
          <Link
            href="?tab=detail"
            style={{ fontWeight: 600 }}
            className={`profile-nav__btn ${tab === 'detail' ? 'profile-nav__btn__active' : ''}`}
          >
            {t('Tabs.detail')}
          </Link>
        </div>

        {isOpen && <PaymentRewardModal closeModal={() => setIsOpen(false)} />}
        {isLevelRewardOpen && (
          <LevelRewardModal
            closeModal={() => setIsLevelRewardOpen(false)}
            level={currentLevel}
            userId={Number(user?.id)}
            balance={user?.balance || 0}
            token={localStorage.getItem('accessToken')!}
          />
        )}
      </div>
    </div>
  );
};
