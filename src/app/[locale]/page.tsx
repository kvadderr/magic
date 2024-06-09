import {StoreApi} from "@/api/store/store.api";
import {ServersListApi} from "@/api/serversList/serversList.api";
import StoreHeader from "@/shared/components/StoreHeader/StoreHeader";
import {NoBackgroundCard} from "@/shared/components/Card/NoBackgroundCard";
import CardCurrency from "@/shared/components/Card/CardCurrency";

export default async function StorePage(props: { searchParams: { tab: string } }) {
  const id = 1; // Initial ID value
  const {data: types} = await StoreApi.getTypes();
  const {serversList: servers} = await getServers();
  const products = await getProducts(props.searchParams.tab ? parseInt(props.searchParams.tab) : id);
  
  return (
    <div>
      <StoreHeader types={types} tab={props.searchParams.tab ? parseInt(props.searchParams.tab) : id}/>
      <div className="container container-shop">
        {products.map((item, index) => {
          switch (item.type) {
            case "CURRENCY":
              return <CardCurrency product={item} key={index}/>;
            case "HTTP_REQUEST":
              return <CardCurrency product={item} key={index}/>;
            default:
              return <NoBackgroundCard product={item} key={index} servers={servers}/>
          }
        })}
      </div>
    </div>
  );
}

async function getServers() {
  const res = await ServersListApi.getServersList()
  return {serversList: res.data}
}


async function getProducts(tab: number) {
  const res = await StoreApi.getProducts(tab)
  if (res.status !== 200) throw new Error('Failed to fetch data')
  return res.data
}
