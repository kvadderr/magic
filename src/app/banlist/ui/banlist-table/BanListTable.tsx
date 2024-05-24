import {FC} from "react";
import {v4} from "uuid";
import {IBanListItem} from "@/api/banlist/types";

interface IProps {
    items: IBanListItem[];
}


const BanListTable: FC<IProps> = ({items}) => {
    return (
        <table className="tableForBanList">
            <thead>
            <tr>
                <th className="col">
                    Date
                </th>
                <th className="col">
                    Player
                </th>
                <th className="col">
                    Reason
                </th>
            </tr>
            </thead>
            <tbody>
            {
                items.map(el => (
                    <tr key={v4()}>
                        <td className="tablePurple" scope="row">{(new Date(el.time * 1000)).toLocaleString("ru-RU")}</td>
                        <td>
                            <a target="_blank" style={{cursor: "pointer"}} href={`https://steamcommunity.com/profiles/${el.steamid}`}>{el.nickname}</a>
                        </td>
                        <td className="tablePurple">{el.reason}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default BanListTable;