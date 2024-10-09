"use client";

import {useEffect, useState} from "react";

interface CopyProps {
  className?: string;
  value: string;
}

const Copy = ({ className, value }: CopyProps) => {
  const [active, setActive] = useState(false);
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      setActive(true);
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  useEffect(() => {
    if (!active) return;
    setTimeout(() => setActive(false), 300)
  }, [active]);

  return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        copyTextToClipboard(value)
          .catch(() => console.log('error'))
          .then(() => console.log('error'))
          .catch(() => 'obligatory catch');
      }}
      className={`iconCopy ${active && "active"}  ${className}`}
    >
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2158 10.5H11.4648V12.25C11.465 12.4798 11.4198 12.7073 11.332 12.9196C11.2441 13.1319 11.1153 13.3249 10.9529 13.4874C10.7905 13.6499 10.5976 13.7788 10.3854 13.8668C10.1731 13.9547 9.94559 14 9.71582 14H2.71582C2.25169 14 1.80657 13.8156 1.47838 13.4874C1.1502 13.1592 0.965821 12.7141 0.965821 12.25V5.25C0.965689 5.02015 1.01086 4.79253 1.09876 4.58015C1.18666 4.36777 1.31556 4.1748 1.47809 4.01227C1.64062 3.84974 1.83359 3.72084 2.04597 3.63294C2.25835 3.54504 2.48597 3.49987 2.71582 3.5H4.46482V1.75C4.46482 1.5201 4.51012 1.29246 4.59813 1.08007C4.68614 0.867688 4.81513 0.674725 4.97774 0.51221C5.14035 0.349694 5.33338 0.220811 5.54582 0.132924C5.75825 0.0450371 5.98592 -0.000131084 6.21582 2.8574e-07H13.2158C13.6799 2.8574e-07 14.1251 0.184375 14.4533 0.512563C14.7814 0.840752 14.9658 1.28587 14.9658 1.75V8.75C14.9658 8.97981 14.9206 9.20738 14.8326 9.4197C14.7447 9.63202 14.6158 9.82493 14.4533 9.98744C14.2908 10.1499 14.0978 10.2788 13.8855 10.3668C13.6732 10.4547 13.4456 10.5 13.2158 10.5ZM13.2158 1.75H6.21582V3.5H9.71582C9.94559 3.5 10.1731 3.54527 10.3854 3.63323C10.5976 3.72119 10.7905 3.85011 10.9529 4.01262C11.1153 4.17514 11.2441 4.36807 11.332 4.58038C11.4198 4.79269 11.465 5.02023 11.4648 5.25V8.75H13.2158V1.75Z"
          fill="#8774B8"
        />
      </svg>
    </div>
  );
};

export default Copy;
