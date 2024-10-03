import { ModalCardContent } from '@/shared/components/ModalCard/ModalCardContent/ModalCardContent';
import { Dispatch, SetStateAction } from 'react';
import { IServersListResponse } from '@/api/serversList/types';

export const ModalCard = ({
  product,
  onClose,
  servers,
}: {
  product: Product;
  onClose: Dispatch<SetStateAction<boolean>>;
  servers: IServersListResponse;
}) => {
  return (
    <div className="modal modalActive">
      <div className="width: 100%; height: 100%; position: fixed; top: 0px; right: 0px;"></div>
      <ModalCardContent servers={servers} product={product} onClose={onClose} />
    </div>
  );
};
