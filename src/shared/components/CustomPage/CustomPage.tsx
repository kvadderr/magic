/* eslint-disable react/react-in-jsx-scope */
import { IServer } from "@/api/servers/types";
import { ListSections } from "@/shared/components/CustomPage/ListSection/ListSections";
import { CustomPageContent } from "@/shared/components/CustomPage/CustomPageContent";

type Props = {
  sections: any; // Изменяем тип на IServer
  label: string;
};

export const CustomPage = (props: Props) => {
  const { label, sections } = props;

  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{label}</h1>
      <div className="boxWithSection">
        <ListSections sections={sections} />
        <div className="boxForSection">
          {sections.map((server: IServer) => (
            <section
              key={server.serverID} // Используем serverID как уникальный ключ
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
};
