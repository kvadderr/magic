import {Dispatch, SetStateAction} from "react";
import {ModalCurrencyContent} from "@/shared/components/ModalCurrency/ModalCurrencyContent/ModalCurrencyContent";

export const ModalCurrency = ({product, onClose}: {product: Product, onClose: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <div className="modal modalActive">
            <div className="width: 100%; height: 100%; position: fixed; top: 0px; right: 0px;"></div>
            <ModalCurrencyContent product={product} onClose={onClose}/>
        </div>
    )
}