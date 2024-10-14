"use client"
import {IGetSectionsRes} from "@/api/servers/types";
import Link from "next/link";
import {useEffect, useState} from "react";

type Props = {
  sections: IGetSectionsRes[];
};

export const ListSections = ({sections}: Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.sectionCustomPage');
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
          rootMargin: '0px',
          threshold: 0.5,
        }
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
        {sections.map((item) => (
            <Link
                href={`#${item.id}`}
                key={item.id}
                id={'sectionListSection' + String(item.id)}
                className={`sectionListSection ${activeSection === String(item.id) ? 'sectionListSectionActive' : ''}`}
            >
              {item.title}
            </Link>
        ))}
      </div>
  );
};
