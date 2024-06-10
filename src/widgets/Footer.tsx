import LangSelect from "@/widgets/LangSelect";
import {OnlineIcon} from "@/shared/assets/icons/footer";
import {getTranslations} from 'next-intl/server';
import Image from "next/image";
import Link from "next/link";
export const Footer = async () => {
  
  const t = await getTranslations('Footer');
  
  return (
    <footer className="container">
      <div className="containerFooter">
        <div>
          <div className="headerFooter">
            <OnlineIcon/>
            <p className="titleFooter">{t('online')}</p>
          </div>
          <p className="labelCountFooter">
            500 / 1000
          </p>
          <div className="footerBox"></div>
        </div>
        <div className="bottomFooter">
          <p>{t('description')}</p>
          <div className="infoRightBootomFooter">
            <LangSelect/>
            <div className="contactsFooter">
              <Link href="https://vk.com/magicowrust" target="_blank">
                <Image
                  width={24}
                  height={24}
                  alt="societe"
                  src="https://storage.yandexcloud.net/magicow-rust/VK-2.svg"
                  className="iconContactFooter"/>
              </Link>
              <Link href="https://discord.gg/magicrust"
                 target="_blank">
                <Image
                  width={24}
                  height={24}
                  alt="societe"
                  src="https://storage.yandexcloud.net/magicow-rust/discord.svg"
                  className="iconContactFooter"/>
              </Link>
              <Link href="https://t.me/magicrust" target="_blank">
                <Image
                  width={24}
                  height={24}
                  alt="societe"
                  src="https://storage.yandexcloud.net/magicow-rust/telegram.svg"
                  className="iconContactFooter"/>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottomFooter bottomDopInfo">
          <div>
            <p>
              INTERNATIONAL BUSINESS SYSTEMS S.R.L.<br/>
              Reg. number:<br/>
              3-102-693823<br/>
              address:<br/>
              SAN JOSE-SANTA ANA,THREE HUNDRED AND FIFTY METERS OF THE RESTAURANT CEVICHE DEL REY,<br/>
              COSTA-RICA
            </p>
          </div>
          <div className="listBottom">
            <Link href="/privacyPolicy">
              <p className="conditionalsLabel">{t('privacyPolicy')}</p>
            </Link>
            <Link href="/termOfUse">
              <p className="conditionalsLabel">{t('termOfUse')}</p>
            </Link>
            <Link href="/conditionsOfUse">
              <p className="conditionalsLabel">{t('conditionsOfUse')}</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
