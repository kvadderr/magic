import {ProgressIcon} from "@/shared/assets";

type Props = {
  open?: () => void;
}
const LevelDetail = ({open}: Props) => {
  return (
    <div className="level-container">
      <div className="icon-container">
        <span className="level-number">2</span>
        <ProgressIcon/>
      </div>
      <div className="level-info">
        <div
          style={{zIndex: 10, marginLeft: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div className="level-text">Уровень 2</div>
          <div className="progress-text">3120 / 4210 exp</div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{width: `72%`}}></div>
          </div>
        </div>
        <span onClick={open} className="progress-text" style={{alignSelf: 'self-end', color: '#8774B8', cursor: 'pointer'}}>Как это
          работает?
        </span>
      </div>
    </div>
  )
}

export default LevelDetail;
