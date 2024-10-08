import React from "react";
import { IGetSectionsRes } from "@/api/servers/types";
import { ListSections } from "@/shared/components/CustomPage/ListSection/ListSections";
import { CustomPageContent } from "@/shared/components/CustomPage/CustomPageContent";

type Props = {
  sections: IGetSectionsRes[];
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
          {sections.map((item: any) => (
            <section
              key={item.id}
              className="sectionCustomPage"
              id={String(item.id)}
              style={{ padding: "20px 0" }} // Добавляем отступы для секций
            >
              <div
                className={`${item.icon === null ? "labelSectionCustomPage" : "labelSectionCustomPageWithIcon"}`}>
                <div className="iconSectionCustomPage">
                  {item.icon !== null && (
                    <img
                      src={item.icon}
                      className="iconCustomPage"
                      alt="section-icon"
                    />
                  )}
                </div>
                <h2>{item.title}</h2> {/* Отображаем заголовок секции */}
              </div>
              <CustomPageContent html={item.html} /> {/* Отображаем контент */}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
