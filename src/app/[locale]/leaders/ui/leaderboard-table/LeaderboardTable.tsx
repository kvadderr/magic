import {FC} from "react";
import {v4} from "uuid";
import {ILeaderboardItem} from "@/api/leaderboard/types";
import Image from "next/image";

interface IProps {
    items: ILeaderboardItem[];
}


const LeaderboardTable: FC<IProps> = ({items}) => {
    return (
        <table className="tableForLeaders">
            <thead>
            <tr>
                <th className="col">
                    Place
                </th>
                <th className="col">
                    User
                </th>
                <th className="col">
                    Glasses
                </th>
                <th className="col">
                    Kills
                </th>
                <th className="col">
                    Last activity
                </th>
            </tr>
            </thead>
            <tbody>
            {
                items.map(
                    (el, index) => {
                        const steamId = Object.keys(el)[0];
                        const {stats, pos, data} = el[steamId];
                        return (
                            <tr key={v4()}>
                                <td>
                                    #{pos}
                                </td>
                                <td>
                                    <a target="_blank" style={{cursor: "pointer"}}
                                       href={`https://steamcommunity.com/profiles/${steamId}`}>
                                        <div className="userBlock">
                                            {
                                                data.avatar ?
                                                    <Image width={40} height={40} className="userImg" src={data.avatar} alt=""/> :
                                                    <div className="userImg userImgNone"></div>
                                            }
                                            <span className="userName">{data.name}</span>
                                        </div>
                                    </a>
                                </td>
                                <td>{stats.p_score}</td>
                                <td>{stats.d_player}</td>
                                <td
                                    className="tablePurple"
                                    scope="row"
                                >
                                    {(new Date(stats.p_lastjoin * 1000)).toLocaleString("ru-RU")}
                                </td>
                            </tr>
                        )
                    }
                )
            }
            </tbody>
        </table>
    )
}

export default LeaderboardTable;