import Link from "next/link";
import Image from "next/image";
import {getTranslations} from 'next-intl/server';
import {StoreHeaderTabs} from "@/shared/components/StoreHeader/Tabs/StoreHeaderTabs";
import {IGetTypesRes} from "@/api/store/types";

type StoreHeaderProps = {
  types: IGetTypesRes[],
  tab: number
}
export default async function StoreHeader(props: StoreHeaderProps) {
  const { types, tab } = props;
  const t = await getTranslations('Index');
  return (
    <div className="headerShopBox">
      <Image src='/image/shop_header_img.png' alt="bg" width={1200} height={400}/>
      <div className="contentHeaderShopBox container">
        <div className="centerHeaderShopBox">
          <div className="textHeaderShopBox">
            <h1>{t('title')}</h1>
            <p>On our project 20 different servers and modes. To buy choose your own.</p>
            <Link href="/servers">
              <div className="dopInfoHeaderShopBox">
                <p>How do I find out the server mode?</p>
              </div>
            </Link>
          </div>
          <StoreHeaderTabs tab={tab} storeTypes={types}/>
        </div>
      </div>
    </div>
  )
}



