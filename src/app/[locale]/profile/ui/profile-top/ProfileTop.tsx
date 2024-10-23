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
import ModalPortal from '@/shared/components/ModalPortal/ModalPortal';
import { LevelProgress } from '@/shared/components/LevelProgress/LevelProgress';

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
    currentLevel
  );

  return (
    <div className="profile-top">
      <div className="container profile-top-container">
        <div className="profile-top_inner">
          <div
            className="left-side"
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <div className="logo">
              <Link href={`https://steamcommunity.com/profiles/${user?.steamId}`} target="_blank">
                <img src={user?.avatar} alt="" className='avatarInProfile' />
              </Link>
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
                  marginBottom: '15px'
                }}
              >
                <span className="user-name">
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
              <LevelProgress
                currentLevel={currentLevel}
                progress={progress}
                nextLevelExp={nextLevelExp}
                experience={experience}
                onClick={() => setIsLevelRewardOpen(true)}
              />
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
            href='?tab=detail'
            style={{ fontWeight: 600 }}
            className={`profile-nav__btn ${tab === 'detail' ? 'profile-nav__btn__active' : ''}`}
          >
            {t('Tabs.detail')}
          </Link>
        </div>

        {isOpen && <PaymentRewardModal closeModal={() => setIsOpen(false)} />}
        {isLevelRewardOpen && <ModalPortal>
            <LevelRewardModal
              closeModal={() => setIsLevelRewardOpen(false)}
              level={currentLevel}
              userId={Number(user?.id)}
              balance={user?.balance || 0}
              token={localStorage.getItem('accessToken')!}
            />
          </ModalPortal>
        }
      </div>
    </div>
  );
};
