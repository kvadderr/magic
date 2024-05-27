"use client"
import {IGetSectionsRes} from "@/api/servers/types";
import Link from "next/link";
import './styles.scss'
import {useEffect, useState} from "react";


type Props = {
  sections: IGetSectionsRes[]
}

export const ListSections = ({sections} : Props) => {

  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.sectionCustomPage');
      sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="boxListSections" id="boxListSections">
      {sections.map(item => (
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
  )
}
