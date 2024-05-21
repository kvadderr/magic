import {IGetSectionsRes} from "@/api/servers/types";
import Link from "next/link";
import './styles.scss'


type Props = {
  sections: IGetSectionsRes[]
}

export const ListSections = ({sections} : Props) => {
  return (
    <div className="boxListSections" id="boxListSections">
      {sections.map(item => (
        <Link
          href={`#${item.id}`}
          key={item.id}
          id={'sectionListSection' + String(item.id)}
          className="sectionListSection"
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}
