'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import c from './style.module.scss';

export function GoBack() {
  const navigate = useRouter();
  const t = useTranslations('UI');
  return (
    <button className={c.button} onClick={navigate.back}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.70711 9.29289C10.0976 9.68342 10.0976 10.3166 9.70711 10.7071L9.41421 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H9.41421L9.70711 13.2929C10.0976 13.6834 10.0976 14.3166 9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929L8.29289 9.29289C8.68342 8.90237 9.31658 8.90237 9.70711 9.29289Z"
          fill="#8774B8"
        />
      </svg>
      {t('go-back')}
    </button>
  );
}
