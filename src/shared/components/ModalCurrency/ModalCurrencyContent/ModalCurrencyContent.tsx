"use client";
import {Dispatch, SetStateAction, useState} from "react";
import {getCase} from "@/shared/constants/getTimeCase";
import {serviceInfoModalManyHours, serviceInfoModalOneHour, serviceInfoModalTwoHours} from "@/shared/constants/modal";
import {IServersListResponse} from "@/api/serversList/types";
import ChangeServer from "@/shared/components/ChangeServer/ChangeServer";

export const ModalCurrencyContent = ({product, onClose}: {
    product: Product,
    onClose: Dispatch<SetStateAction<boolean>>
}) => {
    const [selectedServer, setSelectedServer] = useState<number>(1);

    return (
        <div className="modalContent mountedStyle serviceModal modalContentActive">
            <div className="serviceModalLeft">
                <img src={product.productContent.imageModal} alt=""/>
                <div className="serviceModalLeftInfo">
                    <div className="serviceModalLeftInfoBlock">
                        <div className="serviceModalLeftInfoItem">
                            <h4 className="serviceModalLeftInfoItemTitle">Рейты</h4>
                            <span className="serviceModalLeftInfoItemCount">x{product.productContent.rade}</span>
                        </div>
                        <div className="serviceModalLeftInfoItem">
                            <h4 className="serviceModalLeftInfoItemTitle">Задержка ТП</h4>
                            <span className="serviceModalLeftInfoItemCount">{product.productContent.delay} с</span>
                        </div>
                        <div className="serviceModalLeftInfoItem">
                            <h4 className="serviceModalLeftInfoItemTitle">Задержка ТП</h4>
                            <span className="serviceModalLeftInfoItemCount">+{product.productContent.setHome}</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="serviceModalRight">
                <div className="modalBackground"></div>
                <div className="serviceModalRightInner">
                    <div className="modalHeaderSmallBottom">
                        <h3 className="modalHeaderTitle">{product.name}</h3>
                        <div className="boxCloseIconHeaderTitle">
                            <div className="boxCloseIconHeaderTitle" onClick={() => onClose(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="Remove cr-fr">
                                        <path id="Shape" fillRule="evenodd" clipRule="evenodd"
                                              d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                                              fill="#8774B8"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="serviceModalInfoMobile">
                        <div className="serviceModalLeftInfoItem">
                            <h4 className="serviceModalLeftInfoItemTitle">Рейты</h4>
                            <span className="serviceModalLeftInfoItemCount">x{product.productContent.rade}</span>
                        </div>
                        <div className="serviceModalLeftInfoItem">
                            <h4 className="serviceModalLeftInfoItemTitle">Задержка ТП</h4>
                            <span className="serviceModalLeftInfoItemCount">{product.productContent.delay} с</span>
                        </div>
                        <div className="serviceModalLeftInfoItem">
                            <h4 className="serviceModalLeftInfoItemTitle">Задержка ТП</h4>
                            <span className="serviceModalLeftInfoItemCount">+{product.productContent.setHome}</span>
                        </div>
                    </div>
                    <div className="serviceModalRightContent">
                        {product.productContent.data.map(
                            (el, ind) => <div className="serviceItem" key={ind}>
                                <div className="serviceItemTop">
                                    <h3 className="serviceItemHeader">{el.label}</h3>
                                    {el.time && <div className="serviceItemTimer">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g id="3 Watch" opacity="0.7">
                                                <path id="Fill 61" fillRule="evenodd" clipRule="evenodd"
                                                      d="M12.4375 9.625H9.625C8.93437 9.625 8.375 9.06563 8.375 8.375V4.625C8.375 4.28125 8.65625 4 9 4C9.34375 4 9.625 4.28125 9.625 4.625V8.375H12.4375C12.7812 8.375 13.0625 8.65625 13.0625 9C13.0625 9.34375 12.7812 9.625 12.4375 9.625ZM9 1.5C4.85938 1.5 1.5 4.85938 1.5 9C1.5 13.1406 4.85938 16.5 9 16.5C13.1406 16.5 16.5 13.1406 16.5 9C16.5 4.85938 13.1406 1.5 9 1.5Z"
                                                      fill="#8774B8"></path>
                                            </g>
                                        </svg>
                                        <p>{el.time +
                                            ' ' +
                                            getCase(el.time, [
                                                serviceInfoModalOneHour.ru,
                                                serviceInfoModalTwoHours.ru,
                                                serviceInfoModalManyHours.ru,
                                            ])}</p>
                                    </div>}
                                </div>
                                <div className="serviceItemContainer">
                                    {
                                        el.itemData.map(
                                            (subEl, subInd) => <div className="serviceItemElem" key={subInd}>
                                                <img src={subEl.image} alt="" />
                                                <span className="serviceItemElemCount">x{subEl.amount}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )}

                        <div className="serviceModalRightContentDescription">
                            {product.productContent.descriptionModal}
                        </div>
                    </div>
                    <button className="btn lightBtn wideBtn">
                        Купить за {product.price}₽
                    </button>
                </div>
            </div>
        </div>
    )
}