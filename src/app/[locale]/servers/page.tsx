import React from "react";
import { ServersApi } from "@/api/servers/servers.api";
import { getTranslations } from "next-intl/server";
import { CustomPageContent } from "./CustomPageContent";
import { ListSections } from "./ListSections";

export default async function ServerPage() {
  const t = await getTranslations("Servers");

  const { serversList } = await getServers();

  return <CustomPage sections={serversList} label={t("title")} />;
}

async function getServers() {
  const res = await ServersApi.getServers();
  return { serversList: res.result };
}

function CustomPage({ label, sections }: { label: string; sections: any }) {
  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{label}</h1>
      <div className="boxWithSection">
        <ListSections sections={sections} />
        <div className="boxForSection">
          {sections.map((server: any) => (
            <section
              key={server.serverID}
              className="sectionCustomPage"
              id={String(server.serverID)}>
              <div className="labelSectionCustomPage">
                <h2>{server.name}</h2>
              </div>
              <CustomPageContent
                html={`<p>IP: ${server.IP}:${server.port}</p>
                       <p>Текущий онлайн: ${server.currentOnline}</p>
                       <p>Максимум игроков: ${server.maxPlayers}</p>`}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
