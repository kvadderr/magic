"use client"
import {Dispatch, SetStateAction, useEffect} from "react";
import Image from "next/image";

interface SilverPackageProps {
  item: {
    count: number;
    id: number;
    url: string;
    procent: number;
  },
  selected: number | undefined;
  onChange: Dispatch<SetStateAction<number | undefined>>;
}

export const SilverPackage = ({item, selected, onChange}: SilverPackageProps) => {
  const emit = () => {
    onChange(item.id);
  };
  
  return (
    <div className="packageItem" onClick={() => emit()}>
      <div className="percentages">
        <div>+ {item.procent}%</div>
      </div>
      <Image
        className={`selectAPackageItem ${selected === item.id && 'selectAPackageItemActive'}`}
        src={item.url}
        alt=""
        width={400}
        height={400}
      />
    </div>
  );
};
