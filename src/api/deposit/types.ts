import {StaticImageData} from "next/image";

export interface IDepositType {
  title: string;
  label?: string;
  discount?: number;
  link?: string;
  icon?: StaticImageData;
  method?: string;
}

export type IDepositTypeItems = Map<string, IDepositType[]>;
