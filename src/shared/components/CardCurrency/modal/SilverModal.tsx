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
import {CloseIcon, CoinIcon, EqualsIcon, RubbleIcon} from "@/shared/assets";
import {useTranslations} from "next-intl";

export interface BuySilverModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  item: Product;
}

export const SilverModal = ({onClose, item}: BuySilverModalProps) => {
  const t = useTranslations("Card.Silver");
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
        console.log(response.data)
        setCoinInput(response.data.amount)
      })
      .catch(error => {
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
          <div className="modalHeaderSmallBottom"><h3 className="modalHeaderTitle">{t("Modal.title")}</h3>
            <div className="modal-header-with-close"
                 onClick={() => {onClose(false)}}>
              <CloseIcon />
            </div>
          </div>
          <div>
            <p className="buySilverText">{t("Modal.description")}</p>
            <div className="selectAPackageBlock">
              <h4>{t("Modal.choose_package")}</h4>
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
              <h4>{t("Modal.input_sum")}</h4>
              <div className="inputSum">
                <div className={`${selectedPack ? 'inputSumWrapDisabled' : 'inputSumWrap'}`}>
                  <input
                    onClick={() => setSelectedPack(undefined)}
                    type="text"
                    placeholder={t("Modal.in_rubles")}
                    value={rubInput}
                    onChange={e => handlerRubsInput(e.target.value)}
                  />
                  <RubbleIcon />
                </div>
                <EqualsIcon />
                <div className={`${selectedPack ? 'inputSumWrapDisabled' : 'inputSumWrap'}`}>
                  <input
                    onClick={() => setSelectedPack(undefined)}
                    type="text"
                    placeholder={t("Modal.in_game")}
                    value={coinInput}
                    onChange={e => {
                      handlerSilverInput(e.target.value);
                    }}
                  />
                  <CoinIcon />
                </div>
              </div>
            </div>
          </div>
          <button
            className={`btn buySilverBtn ${Number(rubInput) > 0 ? 'lightBtn' : 'blackBtn'}`}
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
