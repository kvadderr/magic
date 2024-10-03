import { ProgressIcon } from '@/shared/assets';

const LevelDetailForModal = () => {
  return (
    <div className="level-container">
      <div className="icon-container">
        <span className="level-number">0</span>
        <ProgressIcon />
      </div>
      <div className="level-info">
        <div
          className="level-text"
          style={{ color: '#8774B8', marginLeft: 10 }}
        >
          Уровень 0
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `0%` }}></div>
          </div>
        </div>
        <div className="progress-text" style={{ alignSelf: 'self-end' }}>
          0 / 1000 exp
        </div>
      </div>
    </div>
  );
};

export default LevelDetailForModal;
