import {DepositContent} from "@/app/[locale]/deposit/deposit-content";
import {getTranslations} from "next-intl/server";
import {GoBack} from "@/widgets/go-back/GoBack";
import c from "./style.module.scss";
import {DepositProvider} from "@/app/[locale]/deposit/deposit-provider";
import {IDepositTypeItems} from "@/api/deposit/types";

export default async function DepositPage() {
  const t = await getTranslations("Deposit");
  const depositTypeMap: IDepositTypeItems = new Map([
    ["Скины", [
      {title: "title3", label: "label3"},
      {title: "title4", label: "label4"}
    ]],
    ["Крипта", [
      {title: "title3", label: "label3"},
      {title: "title4", label: "label4"}
    ]],
    ["Фиат", [
      {title: "title3", label: "label3"},
      {title: "title4", label: "label4"}
    ]],
  ]);

  return (
    <div className="containerCustomPage">
      <div className={`${c.header} titlePage`}>
        <GoBack/>
        <h1 className={`${c.title} titlePage`}>{t("title")}</h1>
      </div>
      <DepositProvider tabs={depositTypeMap}>
        <DepositContent/>
      </DepositProvider>
    </div>
  );
}
