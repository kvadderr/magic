import {StoreApi} from "@/api/store/store.api";
import StoreHeader from "@/shared/components/StoreHeader/StoreHeader";
import {NoBackgroundCard} from "@/shared/components/Card/NoBackgroundCard";

export default async function StorePage(props: {searchParams: {tab: string}}) {
    const id = 1; // Initial ID value
    const {data: types} = await StoreApi.getTypes();
    const products = await getProducts(props.searchParams.tab ? parseInt(props.searchParams.tab) : id);

    return (
        <div>
            <StoreHeader types={types} tab={props.searchParams.tab ? parseInt(props.searchParams.tab) : id} />
            <div className="container container-shop">
                {products.map((item, index) => (
                    <NoBackgroundCard product={item} key={index}/>
                ))}
            </div>
        </div>
    );
}

async function getProducts(tab: number) {
    const res = await StoreApi.getProducts(tab)
    if (res.status !== 200) {
        throw new Error('Failed to fetch data')
    }
    return res.data
}