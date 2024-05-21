"use client"
import {IGetTypesRes} from "@/api/store/types";

type Props = {
  types: IGetTypesRes[]
}

export const StoreHeaderTabs = ({types}: Props) => {
  return (
    <div className="menuHeaderShopBox">
      {types?.map((item, index) => (
        <div
          key={item.id}
          className={"sectionMenuHeaderShopBox"}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
