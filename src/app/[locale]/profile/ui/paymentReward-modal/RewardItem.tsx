import Image from "next/image";

export const RewardItem = () => {
  return (
    <div style={styles.container}>
      <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{backgroundColor: "#140F21", borderRadius: 12, width: 118, height: 118, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
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
  )
}

const styles = {
  container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
