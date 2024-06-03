import {Dispatch, SetStateAction} from "react";

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
        <div className="packageItem" onClick={emit}>
            {/* <div className="labelPackageItem">{item.count}</div> */}
            <div className="percentages">
                <div>+ {item.procent}%</div>
            </div>
            <img
                className={`${selected === item.id ? 'selectAPackageItem selectAPackageItemActive' : 'selectAPackageItem'}`}
                src={item.url}
                alt=""
            />
        </div>
    );
};