import {IGetSectionsRes} from "@/api/servers/types";
import {ListSections} from "@/shared/components/CustomPage/ListSection/ListSections";
import './styles.scss'
type Props = {
  sections: IGetSectionsRes[]
  label: string
}
export const CustomPage = (props: Props) => {
  const {label, sections} = props
  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{label}</h1>
      <div className="boxWithSection">
        <ListSections sections={sections} />
        <div className="boxForSection">
          {sections.map((item: any) => (
            <section key={item.id} className="sectionCustomPage" id={String(item.id)}>
              <div className={`${item.icon === null ? 'labelSectionCustomPage' : 'labelSectionCustomPageWithIcon'}`}>
                <div className="iconSectionCustomPage">
                  {item.icon !== null && <img src={item.icon} className="iconCustomPage" alt="qweasd" />}
                </div>
                <h2>
                  {' '}
                  <a>{item.title}</a>
                </h2>
              </div>
              {}
              <div className="question-text" dangerouslySetInnerHTML={{__html: item.html}}/>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
