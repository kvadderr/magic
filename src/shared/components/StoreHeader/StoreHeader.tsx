import Link from "next/link";
import Image from "next/image";
import {useLocale, useTranslations} from 'next-intl';
import {StoreHeaderTabs} from "@/shared/components/StoreHeader/Tabs/StoreHeaderTabs";
import {IGetTypesRes} from "@/api/store/types";

type StoreHeaderProps = {
  types: IGetTypesRes[],
  tab: number
}
export default function StoreHeader(props: StoreHeaderProps) {
  const {types, tab} = props;
  const t = useTranslations('Index.Header');
  const locale = useLocale();
  return (
    <div className="headerShopBox">
      <Image src='/image/shop_header_img.png' alt="bg" width={1200} height={400}/>
      <div className="contentHeaderShopBox container">
        <div className="centerHeaderShopBox">
          <div className="textHeaderShopBox">
            <h1>{t('title')}</h1>
            <p>{t("description")}</p>
            <Link href={`${locale}/servers`}>
              <div className="dopInfoHeaderShopBox">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 5C10.5523 5 11 5.44772 11 6V10C11 10.5523 10.5523 11 10 11C9.44771 11 9 10.5523 9 10V6C9 5.44772 9.44771 5 10 5ZM9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14Z"
                        fill="#8774B8"/>
                </svg>
                <p>{t("link")}</p>
              </div>
            </Link>
          </div>
          <StoreHeaderTabs tab={tab} storeTypes={types}/>
        </div>
      </div>
    </div>
  )
}



