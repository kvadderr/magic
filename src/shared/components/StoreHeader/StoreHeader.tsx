import Link from "next/link";
import Image from "next/image";
import {StoreHeaderTabs} from "@/shared/components/StoreHeader/Tabs/StoreHeaderTabs";
import {IGetTypesRes} from "@/api/store/types";
import './style.scss'

type Props = {
  storeTypes: IGetTypesRes[]
}
export default async function StoreHeader(props: Props) {

  const {storeTypes} = props

  return (
    <div className="headerShopBox">
      <Image src='/image/shop_header_img.png' alt="bg" width={1200} height={400}/>
      <div className="contentHeaderShopBox container">
        <div className="centerHeaderShopBox">
          <div className="textHeaderShopBox">
            <h1>Pick your mode!</h1>
            <p>On our project 20 different servers and modes. To buy choose your own.</p>
            <Link href="/servers">
              <div className="dopInfoHeaderShopBox">
                <p>How do I find out the server mode?</p>
              </div>
            </Link>
          </div>
          <StoreHeaderTabs types={storeTypes}/>
        </div>
      </div>
    </div>
  )
}



