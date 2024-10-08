'use client';
import { useState } from 'react';
import ModalPortal from '@/shared/components/ModalPortal/ModalPortal';
import { ModalCard } from '@/shared/components/ModalCard/ModalCard';
import { IServersListResponse } from '@/api/serversList/types';
import Image from 'next/image';
import { StarIcon } from '@/shared/assets/img';

type Props = {
  product: Product;
  servers: IServersListResponse;
};

export const NoBackgroundCard = (props: Props) => {
  const [modal, set] = useState(false);
  const { product, servers } = props;
  return (
    <div className="oneColumnCard">
      <Image
        src={product.image}
        className="imageOneColumnCard"
        alt="img"
        width={200}
        height={200}
        onClick={() => set(true)}
      />
      <p className="nameOneColumnCard">{product.name}</p>
      <button className="lightBtn btn oneColumnBtn" onClick={() => set(true)}>
        {product.price}
        <Image
          src={StarIcon}
          alt=""
          width={24}
          height={24}
          style={{
            display: 'flex',
            width: '24px',
            height: '24px',
            marginLeft: 5,
          }}
        />
      </button>
      {modal && (
        <ModalPortal>
          <ModalCard product={product} onClose={set} servers={servers} />
        </ModalPortal>
      )}
    </div>
  );
};
