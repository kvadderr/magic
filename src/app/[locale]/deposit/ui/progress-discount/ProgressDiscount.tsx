import c from "./style.module.scss";
import {useDepositContext} from "@/app/[locale]/deposit/deposit-provider";
import {useMemo} from "react";
export function ProgressDiscount() {
  const {sum} = useDepositContext();

  const getSumCallback = useMemo(() => {
    if (sum >= 6000) return 6000;
    if (sum < 6000 && sum >= 2000) return 2000;
    if (sum < 2000 && sum >= 1000) return 1000;
    if (sum < 1000 && sum >= 100) return 100;
    return 0;
  }, [sum])

  return (
    <div className={c.container}>
      <div className={`${c.point} ${getSumCallback === 100 && c.active}`}>+10%</div>
      <div className={`${c.point} ${getSumCallback === 1000 && c.active}`}>+15%</div>
      <div className={`${c.point} ${getSumCallback === 2000 && c.active}`}>+17%</div>
      <div className={`${c.point} ${getSumCallback === 6000 && c.active}`}>+25%</div>

      <div className={`${c.sum} ${getSumCallback === 100 && c.active}`}>100</div>
      <div className={`${c.sum} ${getSumCallback === 1000 && c.active}`}>1000</div>
      <div className={`${c.sum} ${getSumCallback === 2000 && c.active}`}>2000</div>
      <div className={`${c.sum} ${getSumCallback === 6000 && c.active}`}>6000+</div>
    </div>
  )
}
