import React from "react";
import { ServersApi } from "@/api/servers/servers.api";
import { CustomPage } from "@/shared/components/CustomPage/CustomPage";
import { getTranslations } from "next-intl/server";

export default async function ServerPage() {
  const t = await getTranslations("Servers");
  const { serversList } = await getServers();
  return <CustomPage sections={serversList.sections} label={t("title")} />;
}

async function getServers() {
  const res = await ServersApi.getServers();
  return { serversList: res.result };
}
