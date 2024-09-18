"use client"
import {createRef} from "react";
import {useTranslations} from "next-intl";
import useOutsideClick from "@/shared/hooks/useOutsideClick";
import {RewardItem} from "@/app/[locale]/profile/ui/paymentReward-modal/RewardItem";
import LevelDetail from "@/app/[locale]/profile/ui/detail/LevelDetail";
import LevelDetailForModal from "@/app/[locale]/profile/ui/detail/LevelDetailForModal";

type Props = {
  closeModal: () => void;
}
export const PaymentRewardModal = ({closeModal}: Props) => {
  const t = useTranslations("Leaderboard.Modal");
  const ref = createRef<HTMLDivElement>();
  useOutsideClick(ref, closeModal);
  
  return (
    <div className="modal modalActive" style={{zIndex: 100}}>
      <div
        style={{width: "100%", height: "100%", position: "fixed", top: "0px", right: "0px"}}
      ></div>
      <div ref={ref} className="modalContent mountedStyle modalContentActive undefined">
        <div className="modalBackground"></div>
        <div className="selectServerModal" style={{width: 627, gap: 20, display: 'flex', flexDirection: 'column'}}>
          <div className="modalHeader">
            <h3 className="modalHeaderTitle">Награды за уровни</h3>
            <div className="modal-header-with-close" onClick={closeModal}>
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd" clipRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293z"
                  fill="#8774B8"
                />
              </svg>
            </div>
          </div>
          <p>Играйте на MagicRust, чтобы зарабатывать опыт <br/> и получать бесплатные предметы Rust!</p>
          <LevelDetailForModal />
          <div className="selectServer">
            <div style={{gap: 15, display: 'flex', flexDirection: 'column'}}>
              <RewardItem/>
              <RewardItem/>
              <RewardItem/>
              <RewardItem/>
              <RewardItem/>
              <RewardItem/>
              <RewardItem/>
              <RewardItem/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


