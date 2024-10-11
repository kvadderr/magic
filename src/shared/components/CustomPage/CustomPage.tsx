import React from "react";
import { IGetSectionsRes } from "@/api/servers/types";
import { ListSections } from "@/shared/components/CustomPage/ListSection/ListSections";
import { CustomPageContent } from "@/shared/components/CustomPage/CustomPageContent";

type Props = {
  sections: IGetSectionsRes[];
  label: string;
};
export const CustomPage = (sections: any, label: any) => {
  
  console.log("sections login startin: " + sections);

  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{label}</h1>
      <div className="boxWithSection">
        <ListSections sections={sections} />
        <div className="boxForSection">
          {sections &&
            sections.map((item: any) => (
              <section
                key={item.id}
                className="sectionCustomPage"
                id={String(item.id)}>
                <div
                  className={`${item.icon === null ? "labelSectionCustomPage" : "labelSectionCustomPageWithIcon"}`}>
                  <div className="iconSectionCustomPage">
                    {item.icon !== null && (
                      <img
                        src={item.icon}
                        className="iconCustomPage"
                        alt="qweasd"
                      />
                    )}
                  </div>
                  <h2>{item.title}</h2>
                </div>
                <CustomPageContent html={item.html} />
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};
