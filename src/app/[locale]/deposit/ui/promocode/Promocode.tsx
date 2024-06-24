import c from "./style.module.scss";
import {useDepositContext} from "@/app/[locale]/deposit/deposit-provider";

export function Promocode() {
  const {activeType} = useDepositContext();

  return (
    <div className={c.container}>
      <label className={c.label}>
        <span>Промокод</span>
        <input className={c.input} placeholder="Введите промокод" type="text"/>
      </label>
      <button disabled={activeType === undefined} className={c.button}>Применить</button>
    </div>
  )
}