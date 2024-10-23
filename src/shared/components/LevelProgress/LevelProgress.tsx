import React, {CSSProperties, FC, useEffect} from 'react';
import {useTranslations} from "next-intl";

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
} as CSSProperties;
const smallProgressTextLeftStyles = {
  paddingLeft: '10px',
  marginBottom: '8px',
} as CSSProperties;
const progressTextRightStyles = {
  position: 'absolute',
  right: '0',
  top: '-32px',
} as CSSProperties;
const smallProgressTextRightStyles = {
  position: 'absolute',
  right: '0',
  top: '16px',
} as CSSProperties;
const containerStyles = {
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '10px',
} as CSSProperties;

export const LevelProgress: FC<ILevelProgressProps> = (props) => {
  const { onClick, currentLevel, progress, nextLevelExp, experience, variant = "large" } = props;
  const t = useTranslations("LevelProgress");

  return (
    <div style={containerStyles}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="level-circle" onClick={() => onClick && onClick()}>
        {currentLevel}
      </div>
      <div style={{ flexGrow: 1 }}>
        <span className={`progress-text ${variant === "small" && "progress-text--purple"}`} style={variant === "small" ? smallProgressTextLeftStyles : progressTextLeftStyles}>
          {t("level")} {currentLevel}
        </span>
        <div className={`progress-bar ${variant}`}>
          <div className="progress" style={{ width: `${progress <= 0 ? 0 : progress}%` }} />
          <span
            className={`progress-text ${variant === "small" && "progress-text--under"}`}
            style={variant === "small" ? smallProgressTextRightStyles : progressTextRightStyles }
          >
            {experience} / {nextLevelExp} exp
          </span>
        </div>
      </div>
    </div>
  );
};