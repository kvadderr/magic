// import { useEffect, useState } from 'react';
// import {toLearnMore} from "@/shared/constants/modal";
//
// interface ResizingCardProps {
//     product: Product;
//     buy: (body: any) => void;
// }
//
// const ResizingCard = ({ product: item, buy }: ResizingCardProps) => {
//     const [isActiveModal, setIsActiveModal] = useState(false);
//
//     const backgroundImageGradient =
//         item.buttonColor === 'GREEN'
//             ? `linear-gradient(to bottom,  rgba(0, 71, 11, 0.00) 40%, #00470B 100%), url(${item.image}) `
//             : `linear-gradient(to bottom, rgba(35, 27, 58, 0.00) 0%, #231B3A 100%), url(${item.image}) `;
//
//     const gradientOfBigCard = `linear-gradient(to top, rgba(35, 27, 58, 0.00) 0%, #231B3A 100%), url(${item.image}) `;
//
//     const changeModal = () => {
//         if (item.type === 'GAME_ITEM')
//             return (
//                 <ProductItemModal
//                     setIsActive={setIsActiveModal}
//                     item={item}
//                     buy={buy}
//                     getPrice={getPrice}
//                     getPriceData={getPriceData}
//                 />
//             );
//         if (item.type === 'CURRENCY' && item.productContent)
//             return (
//                 <BuySilverModal
//                     setIsActive={setIsActiveModal}
//                     item={item}
//                     buy={buy}
//                     getPrice={getPrice}
//                     getPriceData={getPriceData}
//                 />
//             );
//         if (item.type === 'HTTP_REQUEST') return <NotificationModal setIsActive={setIsActiveModal} />;
//     };
//
//
//
//     return (
//         <>
//             <div
//                 className={`resizingCard ${item.blockSize === 1 ? 'resizingOneColumnCard' : ''}`}
//                 style={{
//                     backgroundImage: item.blockSize === 1 ? backgroundImageGradient : gradientOfBigCard,
//                     gridColumn: `span ${dimensions.width <= 1280 ? 2 : item.blockSize} `,
//                     height: dimensions.width <= 1280 ? 240 : item.height,
//                 }}
//                 onClick={() => setIsActiveModal(true)}
//             >
//                 {!!item.discount && <Discount title={item.discount} />}
//                 <div>
//                     <p
//                         className={`${item.blockSize === 1 ? 'labelOneCard' : 'labelResizingCard'}`}
//                         style={{ marginBottom: item.blockSize === 1 && item?.productContent?.link ? 0 : 32 }}
//                     >
//                         {item.name}
//                     </p>
//                     <p className="descriptionResizingCard">{item?.description?.replace('<br/>', '')}</p>
//                     {item?.productContent?.link !== undefined && (
//                         <div
//                             className="dopInfoResizingCard"
//                             onClick={() => navigate(item.productContent.link)}
//                             style={{ marginBottom: item.blockSize === 1 ? 8 : 0 }}
//                         >
//                             <DopInfo />
//                             <p> {toLearnMore.ru}</p>
//                         </div>
//                     )}
//                 </div>
//
//                 <button className={`btn ${item.buttonColor === 'GREEN' ? 'greenBtn' : 'lightBtn'} resizingCardBtn`}>
//                     {item.iconButton && <img src={item.iconButton} style={{ width: 24, height: 24, marginRight: 8 }} />}
//                     {item.textButton ? item.textButton : item.price + ' ₽'}
//                 </button>
//                 {isActiveModal && changeModal()}
//             </div>
//         </>
//     );
// };
//
// export default ResizingCard;
