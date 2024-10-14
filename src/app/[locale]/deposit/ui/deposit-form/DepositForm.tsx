/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
'use client';
import c from './style.module.scss';
import sc from '../promocode/style.module.scss';
import { useDepositContext } from '@/app/[locale]/deposit/deposit-provider';
import { ProgressDiscount } from '@/app/[locale]/deposit/ui/progress-discount/ProgressDiscount';
import Media from 'react-media';
import Image from 'next/image';
import imgMock from '@/shared/assets/img/deposit-mock.png';
import { DepositApi } from '@/api/deposit/deposit.api';
import { StarIcon } from '@/shared/assets/img';
import { useLocale, useTranslations } from 'next-intl';

export function DepositForm() {
  const { sum, setSum, activeType, activeWallet } = useDepositContext();
  const t = useTranslations('Deposit');
  const locale = useLocale(); // Получение текущей локализации

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    if (activeType) {
      try {
        const response = await DepositApi.getPaymentLink(
          activeWallet === 'RUB' ? sum : sum / 100,
          locale === 'ru' ? 'RUB' : 'EUR',
          token,
          activeType.method || '',
        ); // Используем RUB как пример валюты
        window.location.href = response.data;
      } catch (error) {
        console.error('Error fetching payment link:', error);
      }
    }
  };

  const calculateSum = (sum: number) => {
    if (sum >= 100 && sum < 1000) {
      return sum * 1.1; // +10%
    } else if (sum >= 1000 && sum < 2000) {
      return sum * 1.15; // +15%
    } else if (sum >= 2000 && sum < 6000) {
      return sum * 1.17; // +17%
    } else if (sum >= 6000) {
      return sum * 1.25; // +25%
    } else {
      return sum; // Без изменений, если сумма меньше 100
    }
  };

  return (
    <form className={c.form}>
      <Media query="(max-width: 1000px)">
        {activeType && (
          <div className={c['mobile-label']}>
            <Image
              src={activeType.icon ?? imgMock}
              width={100}
              height={100}
              alt=""
            />
            <span>{activeType.title}</span>
          </div>
        )}
      </Media>
      <legend>{t('sum_input')}</legend>
      <label className={c.label}>
        <input
          type="number"
          className={sc.input}
          value={sum === 0 ? '' : sum}
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            setSum(value === '' ? 0 : parseInt(value, 10));
          }}
        />
        <Image
          className={c.svg}
          src={StarIcon}
          alt=""
          width={32}
          height={32}
          style={{ width: '24px', height: '24px' }}
        />
      </label>
      <div className={c['preset-container']}>
        <button
          type="button"
          className={c['preset-button']}
          onClick={() => setSum(100)}
        >
          100
        </button>
        <button
          type="button"
          className={c['preset-button']}
          onClick={() => setSum(1000)}
        >
          1000
        </button>
        <button
          type="button"
          className={c['preset-button']}
          onClick={() => setSum(2000)}
        >
          2000
        </button>
        <button
          type="button"
          className={c['preset-button']}
          onClick={() => setSum(6000)}
        >
          6000
        </button>
      </div>
      <small>{t('min_sum_input')}</small>
      <ProgressDiscount />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <small className={c['result-label']}>{t('get_it_money')}</small>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <p className={c['result-value']}>
              {activeWallet === 'RUB'
                ? calculateSum(sum).toFixed(2) + '₽'
                : (calculateSum(sum) / 100).toFixed(2) + '€'}
            </p>
            <Image
              src={StarIcon}
              alt=""
              width={32}
              height={32}
              style={{ width: '24px', height: '24px' }}
            />
          </div>
        </div>
        <div>
          <small className={c['result-label']}>{t('you_pay')}</small>
          <p className={c['result-value']}>{sum}</p>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        //disabled={activeType === undefined}  // Убрано ограничение на сумму меньше 100
        type="submit"
        className={c.submit}
      >
        {t('send')}
      </button>
    </form>
  );
}
