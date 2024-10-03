'use client';
import { useDepositContext } from '@/app/[locale]/deposit/deposit-provider';
import { createRef, Fragment, RefObject } from 'react';
import c from './style.module.scss';
import { useTranslations } from 'next-intl';
import HorizontalScroll from 'react-scroll-horizontal';

export const ChooseType = () => {
  const t = useTranslations('Deposit');
  const ref = createRef<HTMLUListElement>();
  const { keys, setActiveTab, activeTab } = useDepositContext();

  return (
    <ul className={c.container} ref={ref}>
      <HorizontalScroll>
        <li
          className={activeTab === '' ? c.active : ''}
          onClick={() => setActiveTab('')}
        >
          {t('all')}
        </li>
        {keys.map((el, ind) => (
          <Fragment key={ind}>
            <li
              className={activeTab === el ? c.active : ''}
              onClick={() => setActiveTab(el)}
            >
              {t(el)}
            </li>
          </Fragment>
        ))}
      </HorizontalScroll>
    </ul>
  );
};
