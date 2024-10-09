'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import CustomSelect from '@/shared/components/CustomSelect/CustomSelect';
import { EnLangIcon } from '@/shared/assets';
import RuLangIcon from '@/shared/assets/langIcon/RuLangIcon';

const LangSelect = () => {
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: any) => {
    console.log('e.target.value', e.value);
    const nextLocale = e.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  const options = [
    { value: 'en', label: 'EN', icon: <EnLangIcon /> },
    { value: 'ru', label: 'RU', icon: <RuLangIcon /> },
  ];
  return (
    <CustomSelect
      options={localActive === "ru" ? options.reverse() : options}
      onChange={onSelectChange}
      isHaveIcon={true}
      width={80}
      paddingIndicator={0}
      paddingContainer={0}
      backgroundColor={'#171226'}
      menuPlacement={'top'}
    />
  );
};

export default LangSelect;
