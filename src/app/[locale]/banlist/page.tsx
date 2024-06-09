import BanListContent from "@/app/banlist/banlist-content";

export default function BanListPage(props: {searchParams: { page: string }}) {
    return (
        <div className="containerCustomPage">
            <h1 className="titlePage">Ban list</h1>
            <BanListContent page={props.searchParams.page}/>
        </div>
    )
}