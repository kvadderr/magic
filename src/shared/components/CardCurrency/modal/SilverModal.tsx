import {
  silverModalEnterTheAmount,
  silverModalInCoins,
  silverModalInRubles,
  silverModalSelectAPackage,
  silverModalSubTitle
} from "@/shared/constants/modal";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useBodyScrollModal} from "@/shared/hooks/useBodyScrollModal";
import {SilverPackage} from "@/shared/components/CardCurrency/modal/SilverPackage";
import Image from "next/image";
import {CurrencyApi} from "@/api/currency/currency.api";

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
      CurrencyApi.getCurrency(value)
        .then(response => {
          // Обработка ответа от API
          setCoinInput(response.data.amount)
        })
        .catch(error => {
          // Обработка ошибок
          console.error(error);
        });
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
                          <Image src='/svg/close.svg' alt='close' width={20} height={20}/>
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
                                  <Image src='/svg/ruble.svg' alt='ruble' width={10} height={10}/>
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
