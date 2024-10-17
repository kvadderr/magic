'use client';
import { useDepositContext } from '@/app/[locale]/deposit/deposit-provider';
import { createRef } from 'react';
import c from './style.module.scss';
import { useTranslations } from 'next-intl';
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import '@splidejs/react-splide/css/core';

export const ChooseType = () => {
  const t = useTranslations('Deposit');
  const ref = createRef<HTMLUListElement>();
  const { keys, setActiveTab, activeTab } = useDepositContext();

  return (
      <Splide hasTrack={false} options={{wheel: true, arrows: false, pagination: false, perPage: 4, perMove: 1}} className={c.container}>
        <SplideTrack>
          <SplideSlide>
            <button
              className={(activeTab === '' ? c.active : '') + " " + c.item}
              onClick={() => setActiveTab('')}
            >
              {t('all')}
            </button>
          </SplideSlide>
          {keys.map((el, ind) => (
            <SplideSlide key={ind}>
              <button
                className={(activeTab === el ? c.active : '') + " " + c.item}
                onClick={() => setActiveTab(el)}
              >
                {t(el)}
              </button>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
  );
};
