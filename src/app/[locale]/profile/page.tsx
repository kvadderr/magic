//import Link from 'next/link';
import { ProfileTop } from '@/app/[locale]/profile/ui/profile-top/ProfileTop';
import React from 'react';
import { Inventory } from '@/app/[locale]/profile/ui/inventory/Inventory';
import { Detail } from '@/app/[locale]/profile/ui/detail/Detail';

export default async function ProfilePage(props: {
  searchParams: { tab: 'inventory' | 'detail' };
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <ProfileTop tab={props.searchParams.tab} />
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        {!props.searchParams.tab || props.searchParams.tab === 'inventory' ? (
          <Inventory />
        ) : (
          <Detail />
        )}
      </div>
    </div>
  );
}
