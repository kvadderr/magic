"use client";
import "./style.scss"
import {useState} from "react";
import ModalPortal from "@/shared/components/ModalPortal/ModalPortal";
import {ModalCard} from "@/shared/components/ModalCard/ModalCard";
import {IGetServersRes} from "@/api/servers/types";
import {IServersListResponse} from "@/api/serversList/types";

type Props = {
    product: Product;
    servers: IServersListResponse
}

export const NoBackgroundCard = (props: Props) => {
    const [modal, set] = useState(false);
    const {product, servers} = props;
    return (
        <div className="oneColumnCard">
            <div>
                <img src={product.image} className="imageOneColumnCard"/>
            </div>
            <p className="nameOneColumnCard">{product.name}</p>
            <button className="lightBtn btn oneColumnBtn" onClick={() => set(true)}>{product.price} ₽</button>
            {modal && <ModalPortal><ModalCard product={product} onClose={set} servers={servers} /></ModalPortal>}
        </div>
    )
}
