import {IDepositType} from "@/api/deposit/types";
import c from "@/app/[locale]/deposit/ui/types-list/style.module.scss";
import {TypeItem} from "@/app/[locale]/deposit/ui/type-item/TypeItem";

interface ITypesRowProps {
  data: IDepositType[];
  title: string;
}

export function TypesRow({data, title}: ITypesRowProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul className={c.list}>
        {
          data.map(
            (el, ind) => <li className={c.li} key={ind}><TypeItem {...el} /></li>
          )
        }
      </ul>
    </div>
  )
}