"use client"
import Copy from "@/shared/components/Copy/Copy";
import {Fragment, useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import ScaleOnlineModal from "@/shared/components/ScaleOnline/ScaleOnlineModal";

export interface ScaleOnlineProps {
  info: {
    result: {
      IP: string;
      currentOnline: number;
      maxPlayers: number;
      name: string;
      port: string;
      serverID?: number;
    }[]
  }
}

const ScaleOnline = ({info}: ScaleOnlineProps) => {
  const [modalShow, setModalShow] = useState(false);
  const t = useTranslations("Servers");
  const [dimensions, setDimensions] = useState({
    width: 1920,
    height: 1080,
  });


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

      {dimensions.width < 700 && (
        <button className="btn blackBtn exitBtn" onClick={() => setModalShow(true)}>
          <span>{t("server_monitoring_open")}</span>
        </button>
      )}
      {modalShow && <ScaleOnlineModal onClose={setModalShow}/>}
      {dimensions.width >= 700 &&
        <div className="footerBox">
          {
            info.result.map(
              server =>
                <Fragment key={server.serverID}>
                  <div className="boxScaleWithTitle">
                    <div className="headerScale">
                      <p className="titleScale">{server.name} </p>
                      <Copy className="iconCopy" value={server.IP + ':' + server.port}/>
                    </div>
                    <div className="boxScale">
                      <div className="activeScale" style={{width: `${(server.currentOnline / server.maxPlayers) * 100}%`}}>
                        <p className="labelScale">{String(server.currentOnline) + '/' + String(server.maxPlayers)}</p>
                      </div>
                    </div>
                  </div>
                </Fragment>

            )}
        </div>
      }
    </>
  );
};

export default ScaleOnline;