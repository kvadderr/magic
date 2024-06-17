import Link from "next/link";
import {ProfileTop} from "@/app/[locale]/profile/ui/profile-top/ProfileTop";

type ProfileProps = {

}
export default async function ProfilePage(props: { searchParams: { tab: "inventory" | "detail" } }) {

  return (
    <div>
      <ProfileTop tab={props.searchParams.tab} />
      <h1 className="noRecords">Нет записей</h1>
    </div>
  )
}
