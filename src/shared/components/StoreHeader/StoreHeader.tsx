import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import {StoreHeaderTabs} from "@/shared/components/StoreHeader/Tabs/StoreHeaderTabs";
import {IGetTypesRes} from "@/api/store/types";

type StoreHeaderProps = {
  types: IGetTypesRes[],
  tab: number
}
export default function StoreHeader(props: StoreHeaderProps) {
  const { types, tab } = props;
  const t = useTranslations('Index.Header');
  return (
    <div className="headerShopBox">
      <Image src='/image/shop_header_img.png' alt="bg" width={1200} height={400}/>
      <div className="contentHeaderShopBox container">
        <div className="centerHeaderShopBox">
          <div className="textHeaderShopBox">
            <h1>{t('title')}</h1>
            <p>{t("description")}</p>
            <Link href="/servers">
              <div className="dopInfoHeaderShopBox">
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



