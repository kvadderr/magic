import {
    silverModalEnterTheAmount, silverModalInCoins,
    silverModalInRubles,
    silverModalSelectAPackage,
    silverModalSubTitle
} from "@/shared/constants/modal";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useBodyScrollModal} from "@/shared/hooks/useBodyScrollModal";
import {SilverPackage} from "@/shared/components/CardCurrency/modal/SilverPackage";

export interface BuySilverModalProps {
    onClose: Dispatch<SetStateAction<boolean>>;
    item: Product;
    // getPrice: (body: any) => void;
}

export const SilverModal = ({onClose, item}: BuySilverModalProps) => {
    useBodyScrollModal();
    const [active, setActive] = useState(true);
    const [rubInput, setRubInput] = useState('');
    const [coinInput, setCoinInput] = useState('');
    const [selectedPack, setSelectedPack] = useState<number | undefined>(undefined);

    // const [selectedServer, setSelectedServer] = useState(0);

    const handlerButton = () => {
        setRubInput('');
        setCoinInput('');
        onClose(false);
    };
    const checkSilver = (value: any) => {
        if (!value.match(/\D/g) && +value.length < 8) {
            setRubInput(value);
            // getPrice({id: item.id, rubs: Number(value), isPack: !!selectedPack});
            if (!value) {
                setCoinInput(value);
            }
        }
    };

    const handlerRubsInput = (value: any) => {
        setSelectedPack(undefined);
        checkSilver(value);
    };

    const handlerSilverInput = (value: any) => {
        setSelectedPack(undefined);
        checkRubs(value);
    };

    const checkRubs = (val: any) => {
        const value = String(val);
        if (!value.match(/\D/g) && +value.length < 8) {
            setCoinInput(value);
            // getPrice({id: item.id, amount: Number(value), isPack: !!selectedPack});
            if (!value) {
                setRubInput(value);
            }
        }
    };

    useEffect(() => {
        setCoinInput('');
        setRubInput('');
    }, []);

    useEffect(() => {
    }, [active]);

    return (
        <div className="modal modalActive">
            <div className="modalContent mountedStyle modalContentActive">
                <div className="modalBackground"></div>
                <div className="buySilverModal">
                    <div className="modalHeaderSmallBottom"><h3 className="modalHeaderTitle">Купить серебро</h3>
                        <div className="modal-header-with-close" onClick={() => {
                            onClose(false)
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="Remove cr-fr">
                                    <path id="Shape"
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                                          fill="#8774B8"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <p className="buySilverText">{silverModalSubTitle.ru}</p>
                        <div className="selectAPackageBlock">
                            <h4>{silverModalSelectAPackage.ru}</h4>
                            <div className="selectAPackageContainer">
                                {item.productContent.data.map((el: any, index: any) => (
                                    <SilverPackage
                                        selected={selectedPack}
                                        item={el}
                                        key={index}
                                        onChange={setSelectedPack}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="inputSumBlock">
                            <h4>{silverModalEnterTheAmount.ru}</h4>
                            <div className="inputSum">
                                <div className={`${selectedPack ? 'inputSumWrapDisabled' : 'inputSumWrap'}`}>
                                    <input
                                        onClick={() => setSelectedPack(undefined)}
                                        type="text"
                                        placeholder={silverModalInRubles.ru}
                                        value={rubInput}
                                        onChange={e => handlerRubsInput(e.target.value)}
                                    />
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="&#208;&#160;&#209;&#131;&#208;&#177;&#208;&#187;&#209;&#140;"
                                           opacity="0.7">
                                            <path id="&#226;&#130;&#189;"
                                                  d="M5.61328 12.3997C5.61328 11.9585 5.97091 11.6009 6.41206 11.6009H12.1315C12.5726 11.6009 12.9302 11.9585 12.9302 12.3997V12.9208C12.9302 13.3619 12.5726 13.7196 12.1315 13.7196H6.41206C5.97091 13.7196 5.61328 13.3619 5.61328 12.9208V12.3997ZM5.61328 16.1674C5.61328 15.7262 5.97091 15.3686 6.41206 15.3686H12.1315C12.5726 15.3686 12.9302 15.7262 12.9302 16.1674V16.6885C12.9302 17.1296 12.5726 17.4872 12.1315 17.4872H6.41206C5.97091 17.4872 5.61328 17.1296 5.61328 16.6885V16.1674ZM8.64928 12.3997C8.64928 11.9585 9.0069 11.6009 9.44806 11.6009H13.7275C14.208 11.6009 14.6303 11.4881 14.9943 11.2624C15.3583 11.0367 15.6386 10.7163 15.8352 10.3013C16.039 9.88633 16.141 9.40946 16.141 8.8707C16.141 8.32465 16.039 7.84414 15.8352 7.42914C15.6386 7.01415 15.3583 6.69381 14.9943 6.46811C14.6303 6.23513 14.208 6.11864 13.7275 6.11864H9.44806C9.0069 6.11864 8.64928 5.76102 8.64928 5.31986V4.79878C8.64928 4.35763 9.0069 4 9.44806 4H13.651C14.5975 4 15.4311 4.20386 16.1519 4.61157C16.8727 5.012 17.4296 5.57988 17.8228 6.31522C18.2232 7.05056 18.4234 7.90238 18.4234 8.8707C18.4234 9.83901 18.2232 10.6908 17.8228 11.4262C17.4296 12.1542 16.8727 12.7185 16.1519 13.1189C15.4311 13.5193 14.5975 13.7196 13.651 13.7196H9.44806C9.0069 13.7196 8.64928 13.3619 8.64928 12.9208V12.3997ZM7.50259 4.79878C7.50259 4.35763 7.86021 4 8.30137 4H8.93166C9.37281 4 9.73044 4.35763 9.73044 4.79878V19.0801C9.73044 19.5213 9.37281 19.8789 8.93166 19.8789H8.30137C7.86021 19.8789 7.50259 19.5213 7.50259 19.0801V4.79878Z"
                                                  fill="#8774B8"/>
                                        </g>
                                    </svg>
                                </div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="Frame 228">
                                        <path id="="
                                              d="M7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V10.3288C17 10.8811 16.5523 11.3288 16 11.3288H8C7.44772 11.3288 7 10.8811 7 10.3288V10ZM7 13.6712C7 13.1189 7.44772 12.6712 8 12.6712H16C16.5523 12.6712 17 13.1189 17 13.6712V14C17 14.5523 16.5523 15 16 15H8C7.44772 15 7 14.5523 7 14V13.6712Z"
                                              fill="#8774B8"/>
                                    </g>
                                </svg>
                                <div className={`${selectedPack ? 'inputSumWrapDisabled' : 'inputSumWrap'}`}>
                                    <input
                                        onClick={() => setSelectedPack(undefined)}
                                        type="text"
                                        placeholder={silverModalInCoins.ru}
                                        value={coinInput}
                                        onChange={e => {
                                            handlerSilverInput(e.target.value);
                                        }}
                                    />
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="silver">
                                            <g id="Group 228">
                                                <circle id="Ellipse 32" cx="12" cy="12" r="9"
                                                        fill="url(#paint0_linear_1369_941)"/>
                                                <circle id="Ellipse 33" cx="11.9998" cy="12" r="7.2" fill="#606D77"/>
                                                <circle id="Ellipse 34" cx="12.0002" cy="12" r="6.3"
                                                        fill="url(#paint1_linear_1369_941)"/>
                                            </g>
                                        </g>
                                        <defs>
                                            <linearGradient id="paint0_linear_1369_941" x1="17.4" y1="3" x2="8.4"
                                                            y2="21" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="white"/>
                                                <stop offset="1" stopColor="#A4A4A4"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_1369_941" x1="15.7802" y1="5.69995"
                                                            x2="9.4802" y2="18.3" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="white"/>
                                                <stop offset="1" stopColor="#A4A4A4"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`btn buySilverBtn ${Number(rubInput) !== 0 ? 'lightBtn' : 'blackBtn'}`}
                        onClick={handlerButton}
                        disabled={Number(rubInput) === 0}
                    >
                        {rubInput || 0} ₽
                    </button>
                </div>

            </div>
        </div>
    )
}