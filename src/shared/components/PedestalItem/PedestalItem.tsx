import React, { useEffect, useState } from 'react';
// @ts-ignore
import Place1 from "../../assets/icons/first_place.svg?react";
// @ts-ignore
import Place2 from "../../assets/icons/second_place.svg?react";
// @ts-ignore
import Place3 from "../../assets/icons/third_place.svg?react";
import avatarSteam from "../../assets/img/avatarSteam.jpeg";
import {useWindowSize} from "@/shared/hooks/useWindowSize";
import {getValueFormData} from "@/shared/hooks/getValueFromData";
import Link from "next/link";
import Image from "next/image";

const PedestalItem = ({ data }: {data: any}) => {
  const [marginTop, setMarginTop] = useState(0);
  const [colorBorder, setColorBorder] = useState('');
  const [colorPlace, setColorPlace] = useState('');
  const dimensions = useWindowSize();
  const getDefaultVariadbles = () => {
    switch (getValueFormData(data).pos) {
      case 1:
        setColorBorder('#fff064');
        setColorPlace('#D06400');
        break;
      case 2:
        setColorBorder('#F0F0F0');
        setColorPlace('#8A8A8A');
        setMarginTop(dimensions.width >= 700 ? 25 : 0);
        break;
      case 3:
        setColorBorder('#D6945C');
        setColorPlace('#814629');
        setMarginTop(dimensions.width >= 700 ? 65 : 0);
        break;
    }
  };

  useEffect(() => {
    data && getDefaultVariadbles();
  }, [dimensions]);

  const getImage = () => {
    if (!data) return undefined;
    if (getValueFormData(data).data.avatar === null) return avatarSteam.src;
    if (String(getValueFormData(data).data.avatar).indexOf('medium') === -1) return getValueFormData(data).data.avatar;

    return String(getValueFormData(data).data.avatar).replace('medium', 'full');
  };

  return (
    <Link style={{ cursor: 'pointer' }} href={`https://steamcommunity.com/profiles/${Object.keys(data)[0]}`} target="_blank">
      <div className="containerPedestalItem" style={{ marginTop: marginTop }}>
        <div className="boxAvatarUser">
          <Image width={156} height={156} src={getImage()} alt="" className="avatarUser" style={{ borderColor: colorBorder }} />
          {getValueFormData(data).pos === 1 && <Place1 className="placeUser"/>}
          {getValueFormData(data).pos === 2 && <Place2 className="placeUser"/>}
          {getValueFormData(data).pos === 3 && <Place3 className="placeUser"/>}
          <p className="textPlace" style={{ color: colorPlace }}>
            {getValueFormData(data).pos}
          </p>
        </div>
        <p className="baseTextPedestalItem namePedestalItem">{getValueFormData(data).data.name}</p>
        {/* <p className="baseTextPedestalItem pointsRedestalItem">{data.countPoints} очков</p> */}
        <div className="boxStatisticInPedestalItem">
          <div className="miniBoxStatistic">
            <p className="labelStatictic">Очки</p>
            <p className="countStatictic">{getValueFormData(data).stats.kp_total}</p>
          </div>
          <div className="miniBoxStatistic">
            <p className="labelStatictic">Убийства</p>
            <p className="countStatictic">{getValueFormData(data).stats.d_player}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PedestalItem;