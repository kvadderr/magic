'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Select, {components} from 'react-select';
import { ChangeEvent, useTransition } from 'react';
import CustomSelect from "@/shared/components/CustomSelect/CustomSelect";
import {RuLangIcon} from "@/shared/assets";

const LangSelect = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  
  const onSelectChange = (e: any) => {
    console.log('wefwefwef')
    console.log('e.target.value', e.value)
    const nextLocale = e.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  const options = [
    { value: 'en', label: 'English', icon: RuLangIcon },
    { value: 'ru', label: 'Русский' },
  ]
  return (
    <CustomSelect
      options={options}
      onChange={onSelectChange}
      isHaveIcon={true}
      width={80}
      paddingIndicator={0}
      paddingContainer={0}
      backgroundColor={'#171226'}
      menuPlacement={'top'}
    />
  );
}

export default LangSelect
