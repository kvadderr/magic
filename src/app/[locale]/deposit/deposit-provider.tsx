"use client";
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import {IDepositType, IDepositTypeItems} from "@/api/deposit/types";


interface IDepositContext {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeType?: IDepositType;
  setActiveType: Dispatch<SetStateAction<IDepositType | undefined>>;
  tabs: IDepositTypeItems;
  keys: string[];
  activeWallet: TDepositFormWallet;
  setActiveWallet: Dispatch<SetStateAction<TDepositFormWallet>>;
  sum: number;
  setSum: Dispatch<SetStateAction<number>>;
}

interface IDepositProviderProps extends PropsWithChildren {
  tabs: IDepositTypeItems;
}

export type TDepositFormWallet = "RUB" | "EUR"


const DepositContext = createContext<IDepositContext>({} as IDepositContext);
export const useDepositContext = () => useContext(DepositContext);

export const DepositProvider: FC<IDepositProviderProps> = ({children, tabs}) => {
  const keys = Array.from(tabs.keys());
  const [activeWallet, setActiveWallet] = useState<TDepositFormWallet>("RUB");
  const [activeType, setActiveType] = useState<IDepositType>();
  const [activeTab, setActiveTab] = useState<string>("");
  const [sum, setSum] = useState<number>(500);

  return <DepositContext.Provider value={{
    setActiveType,
    activeType,
    tabs: tabs,
    activeTab,
    setActiveTab,
    activeWallet,
    setActiveWallet,
    sum,
    setSum,
    keys
  }}>{children}</DepositContext.Provider>
}
