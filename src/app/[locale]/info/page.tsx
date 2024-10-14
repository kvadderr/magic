import React from "react";
import { InformationApi } from "@/api/information/information.api";
import { CustomPage } from "@/shared/components/CustomPage/CustomPage";
import { getTranslations } from "next-intl/server";
import {setLocaleInstance} from "@/api/instance/instance";

export default async function InfoPage({params: {locale}}: {params: {locale: string}}) {
  setLocaleInstance(locale);
  const t = await getTranslations("Information");
  const { serversList } = await getInformation();

  return <CustomPage sections={serversList.sections} label={t("title")} />;
}

async function getInformation() {
  const res = await InformationApi.getServers();
  return { serversList: res.data };
}
