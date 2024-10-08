"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type IServer = {
  serverID: number;
  name: string;
  IP: string;
  port: number;
  currentOnline: number;
  maxPlayers: number;
};

export function ListSections({ sections }: { sections: IServer[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sectionElements = document.querySelectorAll(".sectionCustomPage");
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

    sectionElements.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="boxListSections" id="boxListSections">
      {sections.map((server) => (
        <Link
          href={`#${server.serverID}`}
          key={server.serverID}
          id={"sectionListSection" + String(server.serverID)}
          className={`sectionListSection ${
            activeSection === String(server.serverID)
              ? "sectionListSectionActive"
              : ""
          }`}>
          {server.name}
        </Link>
      ))}
    </div>
  );
}
