"use client"
import {useEffect, useState} from 'react';
import {toLearnMore} from "@/shared/constants/modal";
import {SilverModal} from "@/shared/components/CardCurrency/modal/SilverModal";
import ModalPortal from "@/shared/components/ModalPortal/ModalPortal";
import NotificationModal from "@/shared/components/CardCurrency/modal/Notification";
import {useTranslations} from "next-intl";

interface ResizingCardProps {
  product: Product;
  // buy: (body: any) => void;
}

const ResizingCard = ({product: item}: ResizingCardProps) => {
  const t = useTranslations("Card");
 
  
  const [modalActive, setModalActive] = useState<boolean>(false);
  
  const backgroundImageGradient =
    item.buttonColor === 'GREEN'
      ? `linear-gradient(to bottom,  rgba(0, 71, 11, 0.00) 40%, #00470B 100%), url(${item.image}) `
      : `linear-gradient(to bottom, rgba(35, 27, 58, 0.00) 0%, #231B3A 100%), url(${item.image}) `;
  
  const gradientOfBigCard = `linear-gradient(to top, rgba(35, 27, 58, 0.00) 0%, #231B3A 100%), url(${item.image}) `;
  
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <div
        className={`resizingCard ${item.blockSize === 1 ? 'resizingOneColumnCard' : ''}`}
        style={{
          cursor: "unset",
          backgroundImage: item.blockSize === 1 ? backgroundImageGradient : gradientOfBigCard,
          gridColumn: `span ${2} `,
          height: 240,
        }}
      >
        {!!item.discount && <div className="discount">{item.discount}%</div>}
        <div>
          <p
            className={`${item.blockSize === 1 ? 'labelOneCard' : 'labelResizingCard'}`}
            style={{marginBottom: item.blockSize === 1 && item?.productContent?.link ? 0 : 32}}
          >
            {item.name}
          </p>
          <p className="descriptionResizingCard">{item?.description?.replace('<br/>', '')}</p>
          {item?.productContent?.link !== undefined && (
            <div
              className="dopInfoResizingCard"
              // onClick={() => navigate(item.productContent.link)}
              style={{marginBottom: item.blockSize === 1 ? 8 : 0}}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7ZM11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z"
                        fill="white"/>
                </g>
              </svg>
              <p> {t("Silver.learn_more")}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setModalActive(true)}
          className={`btn ${item.buttonColor === 'GREEN' ? 'greenBtn' : 'lightBtn'} resizingCardBtn`}
        >
          {item.iconButton && <img src={item.iconButton} style={{width: 24, height: 24, marginRight: 8}}/>}
          {item.textButton ? item.textButton : item.price + ' ₽'}
        </button>
        {modalActive && <ModalPortal>
          {
            item.type === "CURRENCY" ?
              <SilverModal onClose={setModalActive} item={item}/> :
              <NotificationModal onClose={setModalActive}/>
          }
        </ModalPortal>}
      </div>
    </>
  );
};

export default ResizingCard;
