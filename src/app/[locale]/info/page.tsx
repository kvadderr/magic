import {InformationApi} from "@/api/information/information.api";
import {CustomPage} from "@/shared/components/CustomPage/CustomPage";
import {getTranslations} from "next-intl/server";

export default async function InfoPage () {
  const t = await getTranslations("Information");
  const {serversList} = await getInformation()
  return <CustomPage sections={serversList.sections} label={t("title")}/>
}

async function getInformation() {
  const res = await InformationApi.getServers()
  return {serversList: res.data}
}
