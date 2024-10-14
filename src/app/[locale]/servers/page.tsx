import React from "react";
import { ServersApi } from "@/api/servers/servers.api";
import { getTranslations } from "next-intl/server";
import { CustomPage } from "@/shared/components/CustomPage/CustomPage";
import {setLocaleInstance} from "@/api/instance/instance";

export default async function ServerPage({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations("Servers");
  setLocaleInstance(locale);
  const { serversList } = await getServers();

  return <CustomPage sections={serversList} label={t("title")} />;
}

async function getServers() {
  const res = await ServersApi.getServersSections();
  return { serversList: res.data.sections };
}
