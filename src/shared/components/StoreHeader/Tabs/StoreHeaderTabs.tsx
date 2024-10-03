import { IGetTypesRes } from '@/api/store/types';
import Link from 'next/link';

export const StoreHeaderTabs = ({
  storeTypes,
  tab,
}: {
  storeTypes: IGetTypesRes[];
  tab: number;
}) => {
  return (
    <div className="menuHeaderShopBox">
      {storeTypes?.map((item, index) => (
        <Link
          key={item.id}
          href={`/?tab=${item.id}`}
          style={{ fontWeight: 600 }}
          className={`sectionMenuHeaderShopBox ${tab === item.id && 'activeSectionMenuHeaderShopBox'}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
