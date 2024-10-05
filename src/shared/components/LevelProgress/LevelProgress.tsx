import React, { CSSProperties, FC } from 'react';

interface ILevelProgressProps {
  onClick?: () => void;
  currentLevel: number;
  progress: number;
  experience: number;
  nextLevelExp: number;
  variant?: "large" | "small";
}

const progressTextLeftStyles = {
  paddingLeft: '10px',
  marginBottom: '12px',
};
const progressTextRightStyles = {
  position: 'absolute',
  right: '0',
  top: '-32px',
};
const containerStyles = {
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '10px',
};

export const LevelProgress: FC<ILevelProgressProps> = (props) => {
  const { onClick, currentLevel, progress, nextLevelExp, experience, variant = "large" } = props;
  return (
    <div style={containerStyles}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="level-circle" onClick={() => onClick && onClick()}>
        {currentLevel}
      </div>
      <div style={{ flexGrow: 1 }}>
        <span className="progress-text" style={progressTextLeftStyles}>
          {'Уровень'} {currentLevel}
        </span>
        <div className={`progress-bar ${variant}`}>
          <div className="progress" style={{ width: `${progress}%` }} />
          <span
            className="progress-text"
            style={progressTextRightStyles as CSSProperties}
          >
            {experience} / {nextLevelExp} exp
          </span>
        </div>
      </div>
    </div>
  );
};