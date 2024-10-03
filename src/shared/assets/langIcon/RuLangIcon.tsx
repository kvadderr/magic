const EnLangIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
    >
      <g clipPath="url(#clip0_2360_3070)">
        <rect width="20" height="15" rx="2" fill="white" />
        <mask
          id="mask0_2360_3070"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="15"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0V15H20V0H0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_2360_3070)">
          <rect y="5" width="20" height="5" fill="#3D58DB" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0V5H20V0H0Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 10V15H20V10H0Z"
            fill="#C51918"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2360_3070">
          <rect width="20" height="15" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EnLangIcon;
