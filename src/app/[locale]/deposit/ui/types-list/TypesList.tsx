import {useDepositContext} from "@/app/[locale]/deposit/deposit-provider";
import c from "./style.module.scss";
import {TypeItem} from "@/app/[locale]/deposit/ui/type-item/TypeItem";
import {TypesRow} from "@/app/[locale]/deposit/ui/types-row/TypesRow";
import {IDepositType} from "@/api/deposit/types";
import {Fragment} from "react";

export const TypesList = () => {
  const {tabs, keys, activeTab} = useDepositContext();

  return (
    <div className={c.container}>
      {
        activeTab.length ?
          <TypesRow data={tabs.get(activeTab) as IDepositType[]} title={activeTab}/> :
          keys.map(
            (el, ind) => <Fragment key={ind}>
              <TypesRow data={tabs.get(el) as IDepositType[]} title={el}/>
            </Fragment>
          )
      }

      {/*{Array.from(tabs.entries()).map(([key, depositTypes]) => (*/}
      {/*  <div key={key}>*/}
      {/*    {depositTypes.map((depositType) => (*/}
      {/*      <div key={depositType.title}>*/}
      {/*        <h2>{depositType.title}</h2>*/}
      {/*        <p>{depositType.label}</p>*/}
      {/*        <img src={depositType.icon} alt={depositType.title} />*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  )
}