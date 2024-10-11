import React from 'react';
import LangSelect from '@/widgets/LangSelect';
import { OnlineIcon } from '@/shared/assets/icons/footer';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import ScaleOnline from '@/shared/components/ScaleOnline/ScaleOnline';
import { ServersApi } from '@/api/servers/servers.api';
import { IServer } from '@/api/servers/types';

export const Footer = async () => {
  const t = await getTranslations('Footer');

  // Извлекаем токен из локального хранилища
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Получаем данные о серверах
  const { result: data } = await ServersApi.getServers({
    Authorization: `Bearer ${token}`,
  });

  // Вычисляем суммарные показатели
  const sumPlayers = data.reduce(
    (sum: number, server: IServer) => sum + server.currentOnline,
    0,
  );
  const maxServerOnline = data.reduce(
    (max: number, server: IServer) => max + server.maxPlayers,
    0,
  );

  return (
    <footer className="container">
      <div className="containerFooter">
        <div className="online-container">
          <div className="online">
            <div className="headerFooter">
              <OnlineIcon />
              <p className="titleFooter">{t('online')}</p>
            </div>
            <p className="labelCountFooter">
              {sumPlayers} / {maxServerOnline}
            </p>
          </div>
          <ScaleOnline info={data} />{' '}
          {/* Передаем массив серверов в компонент */}
        </div>
        <div className="bottomFooter">
          <p>{t('description')}</p>
          <div className="infoRightBootomFooter">
            <LangSelect />
            <div className="contactsFooter">
              <Link href="https://vk.com/magicowrust" target="_blank">
                {/* VK Icon */}
              </Link>
              <Link href="https://discord.gg/magicrust" target="_blank">
                {/* Discord Icon */}
              </Link>
              <Link href="https://t.me/magicrust" target="_blank">
                {/* Telegram Icon */}
              </Link>
            </div>
          </div>
        </div>
        <div className="bottomFooter bottomDopInfo">
          <div>
            <p>
              EZ Tech Limited <br />
              Company No. 123041 <br />
              Registered at Suite 4.3.02, Block 4, Eurotowers
              <br />
              GX11 1AA, Gibraltar
              <br />
            </p>
          </div>
          <div className="listBottom">
            <Link href="/documents/policy.pdf">
              <p className="conditionalsLabel">{t('privacy_policy')}</p>
            </Link>
            <Link href="/documents/terms.pdf">
              <p className="conditionalsLabel">{t('terms')}</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
