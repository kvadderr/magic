import React from "react";
import { InformationApi } from "@/api/information/information.api";
import { CustomPage } from "@/shared/components/CustomPage/CustomPage";
import { getTranslations } from "next-intl/server";

export default async function InfoPage() {
  const t = await getTranslations("Information");
  const { serversList } = await getInformation();

  // Логируем структуру с использованием Object.entries для более подробного отображения
  console.log("Servers List Sections Structure:");
  Object.entries(serversList.sections).forEach(([key, value]) => {
    console.log(`Section: ${key}`, value);
  });

  return <CustomPage sections={serversList.sections} label={t("title")} />;
}

async function getInformation() {
  const res = await InformationApi.getServers();
  return { serversList: res.data };
}
