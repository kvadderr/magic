"use client";
import React from "react";
import { IServer } from "@/api/servers/types";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  sections: IServer[]; // Изменяем тип на IServer
};

export const ListSections = ({ sections }: Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll(".sectionCustomPage");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="boxListSections" id="boxListSections">
      {sections.map((server) => (
        <Link
          href={`#${server.serverID}`} // Используем serverID для ссылок
          key={server.serverID} // Уникальный ключ — serverID
          id={"sectionListSection" + String(server.serverID)}
          className={`sectionListSection ${activeSection === String(server.serverID) ? "sectionListSectionActive" : ""}`}>
          {server.name} {/* Отображаем имя сервера */}
        </Link>
      ))}
    </div>
  );
};
