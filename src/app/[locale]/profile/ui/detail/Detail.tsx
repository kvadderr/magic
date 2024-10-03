'use client';
import React from 'react';
import TransferModal from './TransferModal';
import { Ref, useEffect, useRef, useState } from 'react';
import Pagination from '@/shared/components/Pagination/Pagination';
import { UserApi } from '@/api/user/user.api';
import { IGetDetailsData } from '@/api/user/types';
import DetailsTableItem from '@/app/[locale]/profile/ui/detail-table-item/DetailTableItem';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Detail = () => {
  const t = useTranslations('Profile');
  const [data, set] = useState<IGetDetailsData>();
  const [token, setToken] = useState('');
  const [steamID, setSteam] = useState('');
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<any | null | Ref<HTMLDivElement>>();
  //const locale = useLocale();
  const asyncData = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return;
    }
    setToken(token);
    const { data } = await UserApi.getDetails(token, currentPage, 10, 'desc');
    const { data: userData } = await UserApi.getMe(token);
    setSteam(userData.steamId);
    const response = await UserApi.getBalance(token);
    const balance = response.data.balance;
    setBalance(balance);
    set(data);
  };

  useEffect(() => {
    asyncData();
  }, [currentPage]);

  useEffect(() => {
    tableRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="container">
      <div className="populateBalanceInDetail">
        <div>
          <p className="balanceHeader">Баланс</p>
          <p className="balanceValue">{balance} &#8381;</p>
        </div>
        <div style={{ gap: 12, flexDirection: 'row', display: 'flex' }}>
          <button
            onClick={() => setIsModalOpen(true)} // Открываем модалку
            className="btn wideBtn lightBtn"
            style={{ gap: 12, paddingLeft: 48, paddingRight: 48 }}
          >
            <Image
              src="/svg/plusBalance.svg"
              alt="logo"
              width={24}
              height={24}
            />
            <span style={{ fontSize: 16 }}>Перевод</span>
          </button>
        </div>

        {isModalOpen && ( // Условно рендерим модалку
          <TransferModal
            onClose={() => setIsModalOpen(false)}
            balance={balance}
            token={token}
            steamID={steamID}
          />
        )}
      </div>
      {!data?.result[0] ? (
        <h1 className="noRecords">Нет записей</h1>
      ) : (
        <>
          <div ref={tableRef} className="tableWrap">
            <table className="tableForInventory">
              <thead>
                <tr>
                  <th scope="col">{t('Table.Detail.date')}</th>
                  <th scope="col">{t('Table.Detail.id')}</th>
                  <th scope="col">{t('Table.Detail.sum')}</th>
                  <th scope="col">{t('Table.Detail.type')}</th>
                  <th scope="col">{t('Table.Detail.status')}</th>
                </tr>
              </thead>
              <tbody>
                <></>
                {data?.result[0] &&
                  data?.result.map((el, index) => {
                    return <DetailsTableItem data={el} key={index} />;
                  })}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesAmount={data.pages}
            perPage={10}
          />
        </>
      )}
    </div>
  );
};
