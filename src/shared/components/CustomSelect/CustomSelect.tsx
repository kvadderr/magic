import Select, {components} from 'react-select';
import dropDown from '../../../assets/custom-select/arrow-down.png';
import Image from "next/image";

interface optionsItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  label?: optionsItem;
  value?: optionsItem;
  options: optionsItem[];
  heightSelect?: number;
  isHaveIcon?: boolean;
  onChange: (value: any) => void;
  width?: number | string;
  maxWidth?: number | string;
  paddingContainer?: number;
  paddingIndicator?: number;
  backgroundColor?: string;
  menuPlacement?: any;
  alignItemsControl?: string;
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image alt="arrow" width={20} height={20} src={dropDown.src}
             className={`${props.selectProps.menuIsOpen ? 'arrowDown' : 'arrowUp'}`}
      />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = () => {
  return <></>;
}; // removes the "stick"
const formatOptionLabel = (item: any, isHaveIcon: boolean) => {
  return isHaveIcon ? (
    <div className="option-with-img">
      {item.icon}
      <p>{item.label}</p>
    </div>
  ) : (
    item.label
  );
};

const CustomSelect = (props: CustomSelectProps) => {
  const {
    options,
    onChange,
    heightSelect,
    value = options[0],
    isHaveIcon = false,
    width = '100%',
    maxWidth,
    paddingIndicator = 8,
    paddingContainer = 8,
    backgroundColor = '#3a2964',
    menuPlacement = 'bottom',
  } = props;
  const customStyles = {
    container: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      width: width,
      maxWidth: maxWidth ? maxWidth : '200px',
      cursor: 'pointer',
    }),
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      top: 0,
      color: state.isFocused ? 'ffffff' : '#8774B8',
      backgroundColor: state.isFocused ? '#281D42' : '#3A2964',
      fontSize: '14px',
      cursor: 'pointer',
    }),
    valueContainer: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      padding: paddingContainer,
      display: 'flex',
      alignItems: 'center',
    }),
    indicators: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      padding: 0,
      cursor: 'pointer',
    }),
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: backgroundColor,
      height: heightSelect ? heightSelect : 40,
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      border: 'none',
      boxShadow: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
    }),
    menu: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: '#3A2964',
      boxSizing: 'min-content',
      borderRadius: "12px",
      "&>div": {
        borderRadius: "12px",
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: paddingIndicator,
    }),
    ropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
      background: `url('../../../img/customSelect/arrow-down.png') no-repeat right #8774B8 `,
    }),
    singleValue: (defaultStyles: any) => ({...defaultStyles, color: '#fff'}),
  };
  
  return (
    <Select
      defaultValue={value}
      components={{DropdownIndicator, IndicatorSeparator}}
      onChange={onChange}
      options={options}
      menuPlacement={menuPlacement}
      isSearchable={false}
      formatOptionLabel={item => formatOptionLabel(item, isHaveIcon)}
      maxMenuHeight={150}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
