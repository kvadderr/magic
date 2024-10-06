import React from "react";
import { ServersApi } from "@/api/servers/servers.api";
import { CustomPage } from "@/shared/components/CustomPage/CustomPage";
import { getTranslations } from "next-intl/server";
//import { IServer } from "@/api/servers/types";

export default async function ServerPage() {
  const t = await getTranslations("Servers");

  // Получаем сервера
  const { serversList } = await getServers();

  // Передаем результат напрямую в sections
  return <CustomPage sections={serversList} label={t("title")} />;
}

async function getServers() {
  const res = await ServersApi.getServers();

  // Возвращаем массив серверов из поля result
  return { serversList: res.result };
}
