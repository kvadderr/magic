import Link from "next/link";
import {ProfileTop} from "@/app/[locale]/profile/ui/profile-top/ProfileTop";
import {tap} from "node:test/reporters";
import {Inventory} from "@/app/[locale]/profile/ui/inventory/Inventory";
import {Detail} from "@/app/[locale]/profile/ui/detail/Detail";

export default async function ProfilePage(props: { searchParams: { tab: "inventory" | "detail" } }) {

  return (
    <div>
      <ProfileTop tab={props.searchParams.tab} />
      {
        !props.searchParams.tab || props.searchParams.tab === "inventory" ?
          <Inventory/> : <Detail />
      }
    </div>
  )
}
