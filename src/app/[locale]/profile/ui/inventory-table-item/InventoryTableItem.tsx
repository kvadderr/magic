import { useState } from 'react';
import {getInventoryDataItem} from "@/api/user/types";

export interface InventoryTableItemProps {
  data: { dataInventory: getInventoryDataItem; refund: (value: string | number) => void };
}

const InventoryTableItem = ({ data }: InventoryTableItemProps) => {
  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  const { dataInventory, refund } = data;
  const [isShowServersModal, setIsShowServersModal] = useState(false);
  const [serverId, setServerId] = useState<number | any>(null);

  const activateHandler = () => setIsShowServersModal(true);

  const refundHandler = () => setIsActiveConfirm(true);
  const refundFunc = () => refund(dataInventory.id);

  return (
    <>
      <tr key={dataInventory.id}>
        <td className="tablePurple"># {dataInventory.id}</td>
        <td scope="row" className="tableProductName">
          {dataInventory.product.image != null && <img src={dataInventory.product.image} alt="" className="tableImg" />}
          <span>{dataInventory.name}</span>
        </td>
        <td>{dataInventory.amount}</td>
        <td className="tablePurple">
          {dataInventory.serverType.name +
            (dataInventory.serverName !== null ? ' (' + dataInventory.serverName + ')' : '')}
        </td>
        {/* <td>{getDate(dataInventory.createdAt)}</td> */}
        {dataInventory?.isCanBeRefund && (
          <td>
            {dataInventory.product.type === 'SERVICE' && (
              <button className="btn blackBtn cancelBtn inventoryBtn" onClick={refundHandler}>
                Отменить
              </button>
            )}
          </td>
        )}
        {dataInventory.product.type === 'SERVICE' ? (
          dataInventory.serverId && dataInventory.isCanBeRefund ? (
            <td>
              {dataInventory.product.type === 'SERVICE' && (
                <button className="btn blackBtn activateBtn inventoryBtn">
                  Скоро активируется
                </button>
              )}
            </td>
          ) : (
            <td>
              {dataInventory.product.type === 'SERVICE' && dataInventory.serverId === null && (
                <button onClick={activateHandler} className="btn lightBtn activateBtn inventoryBtn">
                  Активировать
                </button>
              )}
            </td>
          )
        ) : (
          <td>
            <button className="btn blackBtn wideBtn cancelBtn inventoryBtn" onClick={refundHandler}>
              Отменить
            </button>
          </td>
        )}
      </tr>

      {/*{isActiveConfirm && (*/}
      {/*  <tr>*/}
      {/*    <ConfirmationModal*/}
      {/*      func={refundFunc}*/}
      {/*      modalTitle="Вы действительно хотите отменить покупку?"*/}
      {/*      setIsActive={setIsActiveConfirm}*/}
      {/*    />*/}
      {/*  </tr>*/}
      {/*)}*/}

      {/*{isShowServersModal && (*/}
      {/*  <tr>*/}
      {/*    <SelectServerModal*/}
      {/*      id={dataInventory.id}*/}
      {/*      activeServer={serverId}*/}
      {/*      setActiveServer={setServerId}*/}
      {/*      setIsActive={setIsShowServersModal}*/}
      {/*    />*/}
      {/*  </tr>*/}
      {/*)}*/}
    </>
  );
};

export default InventoryTableItem;