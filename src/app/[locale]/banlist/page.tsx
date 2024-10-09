import BanListContent from '@/app/[locale]/banlist/banlist-content';
import { getTranslations } from 'next-intl/server';

export default async function BanListPage(props: {
  searchParams: { page: string };
}) {
  const t = await getTranslations('Ban_List');
  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{t('title')}</h1>
      <BanListContent page={props.searchParams.page} />
    </div>
  );
}
