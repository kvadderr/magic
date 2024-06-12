import React, {Dispatch, Fragment, SetStateAction} from 'react';
import ModalPortal from "@/shared/components/ModalPortal/ModalPortal";
import Copy from "@/shared/components/Copy/Copy";
import onlineMock from "@/shared/constants/online-mock";
import {useTranslations} from "next-intl";

const ScaleOnlineModal = ({onClose}: { onClose: Dispatch<SetStateAction<boolean>> }) => {
  const t = useTranslations("Servers");

  return (
    <ModalPortal>
      <div className="modal modalActive">
        <div className="width: 100%; height: 100%; position: fixed; top: 0px; right: 0px;"></div>
        <div className="modalContent mountedStyle modalContentActive">
          <div className="modalBackground"></div>
          <div className="monitoringModal">
            <div className="modalHeader">
              <h3 className="modalHeaderTitle">
                {t("server_monitoring")}
              </h3>
              <div className="modal-header-with-close" onClick={() => onClose(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Remove cr-fr">
                    <path id="Shape" fillRule="evenodd" clipRule="evenodd"
                          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                          fill="#8774B8"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="monitoringModalContainer">
              {
                onlineMock.result.map(
                  server =>
                    <Fragment key={server.serverID}>
                      <div className="boxScaleWithTitle">
                        <div className="headerScale">
                          <p className="titleScale">{server.name} </p>
                          <Copy className="iconCopy" value={server.IP + ':' + server.port}/>
                        </div>
                        <div className="boxScale">
                          <div className="activeScale"
                               style={{width: `${(server.currentOnline / server.maxPlayers) * 100}%`}}>
                            <p
                              className="labelScale">{String(server.currentOnline) + '/' + String(server.maxPlayers)}</p>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                )}
            </div>
          </div>

        </div>
      </div>
    </ModalPortal>
  )
    ;
};

export default ScaleOnlineModal;
