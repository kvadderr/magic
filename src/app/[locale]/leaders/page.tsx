import LeaderboardContent from '@/app/[locale]/leaders/leaders-content';
import {LeaderboardProvider} from '@/app/[locale]/leaders/api';
import {getTranslations} from 'next-intl/server';
import {setLocaleInstance} from "@/api/instance/instance";

export default async function LeadersPage(props: {
    searchParams: { page: string };
    params: {locale}
}) {
    setLocaleInstance(props.params.locale);
    const t = await getTranslations('Leaderboard');

    return (
        <div className="containerCustomPage">
            <h1 className="titlePage">{t('title')}</h1>
            <LeaderboardProvider>
                <LeaderboardContent page={props.searchParams.page}/>
            </LeaderboardProvider>
        </div>
    );
}
