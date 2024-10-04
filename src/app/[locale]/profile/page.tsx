'use client';
import React, { useEffect, useState } from 'react';
import { Inventory } from '@/app/[locale]/profile/ui/inventory/Inventory';
import { Detail } from '@/app/[locale]/profile/ui/detail/Detail';
import { UserApi } from '@/api/user/user.api';
import { ProfileTop } from '@/app/[locale]/profile/ui/profile-top/ProfileTop';

export default function ProfilePage(props: {
  searchParams: { tab: 'inventory' | 'detail' };
}) {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userGifts, setUserGifts] = useState<any[]>([]);
  const [allGiftsByLevel, setAllGiftsByLevel] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);

      // Получаем данные пользователя
      UserApi.getMe(storedToken)
        .then((userResponse) => {
          const userId = userResponse.data.id;
          const level = userResponse.data.lvl;
          setUserData(userResponse.data);

          // Получаем подарки пользователя
          UserApi.getUserGifts(storedToken, userId).then((giftsResponse) => {
            setUserGifts(giftsResponse);
          });

          // Получаем подарки по уровню
          UserApi.getGiftsByLevel(level, storedToken).then(
            (giftsByLevelResponse) => {
              setAllGiftsByLevel(giftsByLevelResponse);
            },
          );

          // Получаем детали пользователя
          UserApi.getDetails(storedToken, 1, 10, 'desc').then(
            (detailsResponse) => {
              setUserDetails(detailsResponse.data);
            },
          );

          // Получаем баланс пользователя
          UserApi.getBalance(storedToken).then((balanceResponse) => {
            setBalance(balanceResponse.data.balance);
          });
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных пользователя:', error);
        });
    }
  }, []);

  if (!token || !userData || !userDetails) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Заголовок страницы профиля */}
      <ProfileTop tab={props.searchParams.tab} />

      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        {/* Логика переключения вкладок */}
        {!props.searchParams.tab || props.searchParams.tab === 'inventory' ? (
          <Inventory
            userGifts={userGifts}
            allGiftsByLevel={allGiftsByLevel}
            userId={userData.id}
          />
        ) : (
          <Detail
            userDetails={userDetails}
            balance={balance}
            steamId={userData.steamId}
          />
        )}
      </div>
    </div>
  );
}
