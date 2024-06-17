import {useState} from 'react';
import {getInventoryDataItem} from "@/api/user/types";
import {
  InventoryConfirmationModal
} from "@/app/[locale]/profile/ui/inventory-confirmation-modal/InventoryConfirmationModal";
import {UserApi} from "@/api/user/user.api";
import {useTranslations} from "next-intl";

export interface InventoryTableItemProps {
  data: { dataInventory: getInventoryDataItem };
}

const InventoryTableItem = ({data}: InventoryTableItemProps) => {
  const t = useTranslations("Profile.Table.Inventory");
  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  const {dataInventory} = data;
  const [isShowServersModal, setIsShowServersModal] = useState(false);
  const [serverId, setServerId] = useState<number | any>(null);

  const activateHandler = () => setIsShowServersModal(true);

  const refundHandler = () => setIsActiveConfirm(true);
  const refundFunc = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    const {data} = await UserApi.refundProduct(token, dataInventory.id);
    setIsActiveConfirm(false)
  };

  return (
    <>
      {isActiveConfirm && (
        <tr>
          <InventoryConfirmationModal
            onAccept={() => refundFunc()}
            modalTitle={t("Modal.title")}
            onClose={setIsActiveConfirm}
          />
        </tr>
      )}
      <tr key={dataInventory.id}>
        <td className="tablePurple"># {dataInventory.id}</td>
        <td scope="row" className="tableProductName">
          {dataInventory.product.image != null && <img src={dataInventory.product.image} alt="" className="tableImg"/>}
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
                {t("cancel_btn")}
              </button>
            )}
          </td>
        )}
        {dataInventory.product.type === 'SERVICE' ? (
          dataInventory.serverId && dataInventory.isCanBeRefund ? (
            <td>
              {dataInventory.product.type === 'SERVICE' && (
                <button className="btn blackBtn activateBtn inventoryBtn">
                  {t("wait_btn")}
                </button>
              )}
            </td>
          ) : (
            <td>
              {dataInventory.product.type === 'SERVICE' && dataInventory.serverId === null && (
                <button onClick={activateHandler} className="btn lightBtn activateBtn inventoryBtn">
                  {t("activate_btn")}
                </button>
              )}
            </td>
          )
        ) : (
          <td>
            <button className="btn blackBtn wideBtn cancelBtn inventoryBtn" onClick={refundHandler}>
              {t("cancel_btn")}
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