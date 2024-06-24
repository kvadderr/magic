export interface IDepositType {
  title: string;
  label: string;
  discount?: number;
  link?: string;
  icon?: string;
}

export type IDepositTypeItems = Map<string, IDepositType[]>;