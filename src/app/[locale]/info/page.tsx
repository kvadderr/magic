import React from "react";
import { InformationApi } from "@/api/information/information.api";
import { CustomPage } from "@/shared/components/CustomPage/CustomPage";
import { getTranslations } from "next-intl/server";

export default async function InfoPage() {
  const t = await getTranslations("Information");
  const { serversList } = await getInformation();

  // Преобразуем данные в соответствующий тип IServer
  const sections = serversList.sections.map((section: any) => ({
    serverID: section.id,
    name: section.name,
    IP: section.ipAddress, // Используйте правильное имя поля для IP
    port: section.port,
    additionalField: section.additionalField, // Добавьте другие поля, которые необходимы
  }));

  return <CustomPage sections={sections} label={t("title")} />;
}

async function getInformation() {
  const res = await InformationApi.getServers();
  return { serversList: res.data };
}
