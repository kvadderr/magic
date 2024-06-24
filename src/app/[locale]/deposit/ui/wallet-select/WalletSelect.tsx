import {TDepositFormWallet, useDepositContext} from "@/app/[locale]/deposit/deposit-provider";
import {createRef, ReactElement, useState} from "react";
import {EnLangIcon, RuLangIcon} from "@/shared/assets";
import c from "./style.module.scss";
import useOutsideClick from "@/shared/hooks/useOutsideClick";

type WalletOption = { value: TDepositFormWallet, label: string, icon: ReactElement }

const options: WalletOption[] = [
  {value: 'RUB', label: "RUB", icon: <RuLangIcon/>},
  {value: 'DOL', label: "DOL", icon: <EnLangIcon/>}
]

export function WalletSelect() {
  const {setActiveWallet, activeWallet} = useDepositContext();
  const [active, set] = useState<WalletOption>(options[0]);
  const [show, setShow] = useState(false);
  const ref = createRef<HTMLDivElement>();
  useOutsideClick(ref, setShow);

  return (
    <div ref={ref} className={`${c.container} ${show && c.active}`}>
      <button onClick={() => {
        setShow(!show);
      }}>
        {active.icon}
        {active.label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.7">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.78939 9.55797L10.7623 5.9428C10.8817 5.77597 10.9602 5.56892 10.9884 5.34675C11.0166 5.12459 10.9932 4.89686 10.921 4.69118C10.8489 4.48551 10.7311 4.31073 10.582 4.18804C10.4328 4.06535 10.2587 4.00003 10.0808 4H3.91661C3.73924 4.00066 3.56581 4.0662 3.41723 4.1887C3.26866 4.31121 3.15127 4.48546 3.07923 4.69044C3.0072 4.89542 2.98359 5.12238 3.01125 5.34395C3.03891 5.56552 3.11666 5.77224 3.23513 5.93918L6.20803 9.55797C6.30823 9.69721 6.43032 9.80845 6.56647 9.88457C6.70263 9.96068 6.84985 10 6.99871 10C7.14758 10 7.2948 9.96068 7.43096 9.88457C7.56711 9.80845 7.6892 9.69721 7.78939 9.55797Z"
                  fill="#8774B8"/>
          </g>
        </svg>
      </button>
      <ul>
        {options.map(
          (el, ind) => <li key={ind}>
            <button onClick={() => {
              set(el);
              setActiveWallet(el.value);
              setShow(false);
            }}>{el.icon}  {el.value}</button>
          </li>
        )}
      </ul>
    </div>
  )
}