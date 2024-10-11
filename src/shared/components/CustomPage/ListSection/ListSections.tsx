/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React, { useEffect, useState } from "react";

type Props = {
  sections: any;
};

export const ListSections = ({ sections }: Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  console.log("sectionzzz " + sections);
  useEffect(() => {
    // Создаем IntersectionObserver для отслеживания секций
    const sectionsElements = document.querySelectorAll(".sectionCustomPage");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Устанавливаем активную секцию
          }
        });
      },
      {
        root: null,
        threshold: 0.5, // Половина секции должна быть видимой, чтобы считаться активной
      },
    );

    // Наблюдаем за каждой секцией
    sectionsElements.forEach((sectionElement) => {
      observer.observe(sectionElement);
    });

    return () => {
      sectionsElements.forEach((sectionElement) => {
        observer.unobserve(sectionElement);
      });
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="boxListSections" id="boxListSections">
      {!!sections &&
        sections.map((server: any, index: number) => (
          <div
            key={server.id}
            id={"sectionListSection" + String(server.id)}
            className={`sectionListSection ${activeSection === String(server.id) ? "sectionListSectionActive" : ""}`}
            style={{ color: "white", cursor: "pointer" }} // Белый текст, добавляем pointer для курсора
            onClick={() => handleScrollToSection(String(server.id))} // Добавляем плавный скроллинг
          >
            {server.title || `Section ${index + 1}`}{" "}
            {/* Отображаем title секции */}
          </div>
        ))}
    </div>
  );
};
