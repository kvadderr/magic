'use client';

import { ChooseType } from '@/app/[locale]/deposit/ui/choose-type/ChooseType';
import { TypesList } from '@/app/[locale]/deposit/ui/types-list/TypesList';
import c from './style.module.scss';
import { WalletSelect } from '@/app/[locale]/deposit/ui/wallet-select/WalletSelect';
import { Promocode } from '@/app/[locale]/deposit/ui/promocode/Promocode';
import { DepositForm } from '@/app/[locale]/deposit/ui/deposit-form/DepositForm';
import Media from 'react-media';
import { Fragment } from 'react';
import { useDepositContext } from '@/app/[locale]/deposit/deposit-provider';

export function DepositContent() {
  const { activeType } = useDepositContext();

  return (
    <>
      <Media query="(min-width: 1001px)">
        <div className={c.content}>
          <div>
            <div>
              <div className={c['select-content']}>
                <ChooseType />
                <WalletSelect />
              </div>
            </div>
            <TypesList />
          </div>
          <div>
            <Promocode />
            <DepositForm />
          </div>
        </div>
      </Media>
      <Media query="(max-width: 1000px)">
        <div className={c['content--mobile']}>
          {!activeType ? (
            <>
              <Promocode />
              <div className={c['select-content--mobile']}>
                <ChooseType />
                <WalletSelect />
              </div>
              <TypesList />
            </>
          ) : (
            <div>
              <DepositForm />
            </div>
          )}
        </div>
      </Media>
    </>
  );
}
