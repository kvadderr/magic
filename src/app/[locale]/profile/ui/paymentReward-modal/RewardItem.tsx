import Image from 'next/image';
import { CSSProperties } from 'react';

export const RewardItem = () => {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.rewardBox}>
          <p>150 ₽</p>
        </div>
        <div>
          <p>Уровень 2</p>
          <p>10000 железных хреновин</p>
        </div>
      </div>
      <div>
        <Image src="/svg/lock.svg" alt="lock" width={40} height={40} />
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  rewardBox: {
    backgroundColor: '#140F21',
    borderRadius: 12,
    width: 118,
    height: 118,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
