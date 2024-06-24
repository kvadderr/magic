import c from "./style.module.scss";
import sc from "../promocode/style.module.scss";
import {useDepositContext} from "@/app/[locale]/deposit/deposit-provider";
import {ProgressDiscount} from "@/app/[locale]/deposit/ui/progress-discount/ProgressDiscount";
import Media from "react-media";
import Image from "next/image";
import imgMock from "@/shared/assets/img/deposit-mock.png";

export function DepositForm() {
  const {sum, setSum, activeType} = useDepositContext();

  return <form className={c.form}>
    <Media query="(max-width: 1000px)">
      {
        activeType && <div className={c["mobile-label"]}>
          <Image src={activeType.icon ?? imgMock} width={100} height={100} alt="" />
          <span>{activeType.title}</span>
        </div>
      }
    </Media>
    <legend>Введите сумму</legend>
    <label className={c.label}>
      <input type="number" className={sc.input} value={sum} onChange={(ev) => {
        setSum(parseInt(ev.currentTarget.value))
      }}/>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
          <path
            d="M5.61328 12.3997C5.61328 11.9585 5.97091 11.6009 6.41206 11.6009H12.1315C12.5726 11.6009 12.9302 11.9585 12.9302 12.3997V12.9208C12.9302 13.3619 12.5726 13.7196 12.1315 13.7196H6.41206C5.97091 13.7196 5.61328 13.3619 5.61328 12.9208V12.3997ZM5.61328 16.1674C5.61328 15.7262 5.97091 15.3686 6.41206 15.3686H12.1315C12.5726 15.3686 12.9302 15.7262 12.9302 16.1674V16.6885C12.9302 17.1296 12.5726 17.4872 12.1315 17.4872H6.41206C5.97091 17.4872 5.61328 17.1296 5.61328 16.6885V16.1674ZM8.64928 12.3997C8.64928 11.9585 9.0069 11.6009 9.44806 11.6009H13.7275C14.208 11.6009 14.6303 11.4881 14.9943 11.2624C15.3583 11.0367 15.6386 10.7163 15.8352 10.3013C16.039 9.88633 16.141 9.40946 16.141 8.8707C16.141 8.32465 16.039 7.84414 15.8352 7.42914C15.6386 7.01415 15.3583 6.69381 14.9943 6.46811C14.6303 6.23513 14.208 6.11864 13.7275 6.11864H9.44806C9.0069 6.11864 8.64928 5.76102 8.64928 5.31986V4.79878C8.64928 4.35763 9.0069 4 9.44806 4H13.651C14.5975 4 15.4311 4.20386 16.1519 4.61157C16.8727 5.012 17.4296 5.57988 17.8228 6.31522C18.2232 7.05056 18.4234 7.90238 18.4234 8.8707C18.4234 9.83901 18.2232 10.6908 17.8228 11.4262C17.4296 12.1542 16.8727 12.7185 16.1519 13.1189C15.4311 13.5193 14.5975 13.7196 13.651 13.7196H9.44806C9.0069 13.7196 8.64928 13.3619 8.64928 12.9208V12.3997ZM7.50259 4.79878C7.50259 4.35763 7.86021 4 8.30137 4H8.93166C9.37281 4 9.73044 4.35763 9.73044 4.79878V19.0801C9.73044 19.5213 9.37281 19.8789 8.93166 19.8789H8.30137C7.86021 19.8789 7.50259 19.5213 7.50259 19.0801V4.79878Z"
            fill="#8774B8"/>
        </g>
      </svg>
    </label>
    <div className={c["preset-container"]}>
      <button type="button" className={c["preset-button"]} onClick={() => setSum(100)}>100 ₽</button>
      <button type="button" className={c["preset-button"]} onClick={() => setSum(1000)}>1000 ₽</button>
      <button type="button" className={c["preset-button"]} onClick={() => setSum(2000)}>2000 ₽</button>
      <button type="button" className={c["preset-button"]} onClick={() => setSum(5000)}>5000 ₽</button>
    </div>
    <small>Минимальная сумма пополнения 100 ₽</small>
    <ProgressDiscount/>
    <small className={c["result-label"]}>Вы получите</small>
    <p className={c["result-value"]}>{sum} ₽</p>
    <button disabled={activeType === undefined} type="submit" className={c.submit}>Отправить</button>
  </form>
}