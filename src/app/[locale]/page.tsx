import React from 'react';
import {StoreApi} from '@/api/store/store.api';
import {ServersListApi} from '@/api/serversList/serversList.api';
import StoreHeader from '@/shared/components/StoreHeader/StoreHeader';
import {NoBackgroundCard} from '@/shared/components/Card/NoBackgroundCard';
import CardCurrency from '@/shared/components/Card/CardCurrency';
import {setLocaleInstance} from "@/api/instance/instance";

export default async function StorePage(props: {
    searchParams: { tab: string };
    params: { locale: string }
}) {
    const id = 1; // Initial ID value
    const {data: types} = await StoreApi.getTypes();
    const {serversList: servers} = await getServers();
    setLocaleInstance(props.params.locale);
    const products = await getProducts(
        props.searchParams.tab ? parseInt(props.searchParams.tab) : id,
    );

    return (
        <div>
            <StoreHeader
                types={types}
                tab={props.searchParams.tab ? parseInt(props.searchParams.tab) : id}
            />
            <div className="container container-shop">
                {products.data.map((item, index) => {
                    switch (item.type) {
                        case 'CURRENCY':
                            return <CardCurrency product={item} key={index}/>;
                        case 'HTTP_REQUEST':
                            return <CardCurrency product={item} key={index}/>;
                        default:
                            return (
                                <NoBackgroundCard
                                    product={item}
                                    key={index}
                                    servers={servers}
                                />
                            );
                    }
                })}
            </div>
        </div>
    );
}

async function getServers() {
    const res = await ServersListApi.getServersList();
    return {serversList: res.data};
}

async function getProducts(tab: number) {
    const res = await StoreApi.getProducts(tab);

    if (res.status !== 200) throw new Error('Failed to fetch data');
    return {data: res.data, resp: res};
}
