"use client"
import {IDepositType} from "@/api/deposit/types";
import Image from "next/image";
import imgMock from "@/shared/assets/img/deposit-mock.png";
import c from "./style.module.scss";
import {useDepositContext} from "@/app/[locale]/deposit/deposit-provider";

export function TypeItem(props: IDepositType) {
  const {activeType, setActiveType} = useDepositContext();

  return <button onClick={() => {setActiveType(props)}} className={`${c.item} ${activeType?.title === props.title && c.active}`}>
    <Image src={props.icon ?? imgMock} alt="" width={100} height={100} />
    <span>{props.label}</span>
    <span>{props.title}</span>
  </button>
}