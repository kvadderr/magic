'use client';
import React, {useEffect, useState} from 'react';
import {Inventory} from '@/app/[locale]/profile/ui/inventory/Inventory';
import {Detail} from '@/app/[locale]/profile/ui/detail/Detail';
import {UserApi} from '@/api/user/user.api';
import {ProfileTop} from '@/app/[locale]/profile/ui/profile-top/ProfileTop';
import {setLocaleInstance} from "@/api/instance/instance";

export default function ProfilePage(props: {
    searchParams: { tab: 'inventory' | 'detail', page?: number },
    params: {locale},
}) {
    setLocaleInstance(props.params.locale);
    const page = props.searchParams.page ? props.searchParams.page : 1;
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [userGifts, setUserGifts] = useState<any[]>([]);
    const [allGiftsByLevel, setAllGiftsByLevel] = useState<any[]>([]);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [balance, setBalance] = useState<number>(0);
    const storedToken = localStorage.getItem('accessToken');

    useEffect(() => {
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

    useEffect(() => {
        UserApi.getDetails(storedToken as string, page, 10, 'desc').then(
            (detailsResponse) => {
                setUserDetails(detailsResponse.data);
            },
        );
    }, [page]);

    if (!token || !userData || !userDetails) {
        return <div>Загрузка...</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {/* Заголовок страницы профиля */}
            <ProfileTop tab={props.searchParams.tab}/>

            <div style={{overflowX: 'auto', maxWidth: '100%'}}>
                {/* Логика переключения вкладок */}
                {!props.searchParams.tab || props.searchParams.tab === 'inventory' ? (
                    <Inventory
                        userGifts={userGifts}
                        allGiftsByLevel={allGiftsByLevel}
                        userId={userData.id}
                    />
                ) : (
                    <Detail
                        page={page}
                        userDetails={userDetails}
                        token={token}
                        balance={balance}
                        steamId={userData.steamId}
                    />
                )}
            </div>
        </div>
    );
}
