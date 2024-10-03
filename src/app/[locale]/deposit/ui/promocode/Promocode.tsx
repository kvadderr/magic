import c from './style.module.scss';
import { useDepositContext } from '@/app/[locale]/deposit/deposit-provider';
import { useTranslations } from 'next-intl';

export function Promocode() {
  const { activeType } = useDepositContext();
  const t = useTranslations('Deposit');

  return (
    <div className={c.container}>
      <label className={c.label}>
        <span>{t('promo_code')}</span>
        <input
          className={c.input}
          placeholder={t('promo_code_input')}
          type="text"
        />
      </label>
      <button disabled={activeType === undefined} className={c.button}>
        {t('access')}
      </button>
    </div>
  );
}
