import StoreHeader from "@/shared/components/StoreHeader/StoreHeader";
import {StoreApi} from "@/api/store/store.api";
import {NoBackgroundCard} from "@/shared/components/Card/NoBackgroundCard";

export default async function StorePage() {
  const {storeTypes} = await getTypes()
  const {products} = await getProducts()
  return (
    <div>
      <StoreHeader storeTypes={storeTypes}/>
      <div className="container container-shop">
        {products?.map((item, index) =>
          <NoBackgroundCard product={item} key={index}/>
        )}
      </div>
    </div>
  )
}

async function getTypes() {
  const res = await StoreApi.getTypes()
  return {storeTypes: res.data}
}

async function getProducts() {
  const res = await StoreApi.getProducts()
  return {products: res.data}
}
