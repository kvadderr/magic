import { DepositContent } from '@/app/[locale]/deposit/deposit-content';
import { getTranslations } from 'next-intl/server';
import { GoBack } from '@/widgets/go-back/GoBack';
import c from './style.module.scss';
import { DepositProvider } from '@/app/[locale]/deposit/deposit-provider';
import { IDepositTypeItems } from '@/api/deposit/types';
import {
  RustIMG,
  DotaIMG,
  TFIMG,
  CSGOIMG,
  BtcIMG,
  TrcIMG,
  TrxIMG,
  XrpIMG,
  UsdcIMG,
  DashIMG,
  DogeIMG,
  EthIMG,
  LtcING,
  ShibaIMG,
} from '@/shared/assets/img';

export default async function DepositPage() {
  const t = await getTranslations('Deposit');

  const depositTypeMap: IDepositTypeItems = new Map([
    [
      'fiat',
      [
        {
          title: 'Банк. карта',
          method: 'card',
        },
      ],
    ],
    [
      'skins',
      [
        {
          title: 'Dota 2',
          method: 'steamSkins',
          icon: DotaIMG,
        },
        {
          title: 'TF2',
          method: 'steamSkins',
          icon: TFIMG,
        },
        {
          title: 'Rust',
          method: 'steamSkins',
          icon: RustIMG,
        },
        {
          title: 'CS:GO',
          method: 'steamSkins',
          icon: CSGOIMG,
        },
      ],
    ],
    [
      'crypto',
      [
        {
          title: 'USDT TRC 20',
          method: 'usdtTrc20',
          icon: TrcIMG,
        },
        {
          title: 'USDT ERC 20',
          method: 'usdtErc20',
          icon: TrcIMG,
        },
        {
          title: 'btc',
          method: 'btc',
          icon: BtcIMG,
        },
        {
          title: 'dash',
          method: 'Криптовалюты',
          icon: DashIMG,
        },
        {
          title: 'doge',
          method: 'doge',
          icon: DogeIMG,
        },
        {
          title: 'eth',
          method: 'eth',
          icon: EthIMG,
        },
        {
          title: 'ltc',
          method: 'ltc',
          icon: LtcING,
        },
        {
          title: 'shib',
          method: 'shib',
          icon: ShibaIMG,
        },
        {
          title: 'usdc',
          method: 'usdc',
          icon: UsdcIMG,
        },
        {
          title: 'xrp',
          method: 'xrp',
          icon: XrpIMG,
        },
        {
          title: 'trx',
          method: 'trx',
          icon: TrxIMG,
        },
      ],
    ],
  ]);

  return (
    <div className="containerCustomPage">
      <div className={`${c.header} titlePage`}>
        <GoBack />
        <h1 className={`${c.title} titlePage`}>{t('title')}</h1>
      </div>
      <DepositProvider tabs={depositTypeMap}>
        <DepositContent />
      </DepositProvider>
    </div>
  );
}
