import LangSelect from "@/widgets/LangSelect";
import {OnlineIcon} from "@/shared/assets/icons/footer";
import {getLocale, getTranslations} from 'next-intl/server';
import Image from "next/image";
import Link from "next/link";
import {ServersApi} from "@/api/servers/servers.api";
import {monitoringServers, serverInfo} from "@/api/servers/types";
import ScaleOnline from "@/shared/components/ScaleOnline/ScaleOnline";
import {round} from "@floating-ui/utils";
import onlineMock from "@/shared/constants/online-mock";

export const Footer = async () => {
  // const info = await ServersApi.getScaleServers();
  const t = await getTranslations('Footer');
  const locale = await getLocale();

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
          <ScaleOnline info={onlineMock}/>
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
            <Link href={`/${locale}/privacyPolicy`}>
              <p className="conditionalsLabel">{t('privacy_policy')}</p>
            </Link>
            <Link href={`/${locale}/termOfUse`}>
              <p className="conditionalsLabel">{t('terms')}</p>
            </Link>
            <Link href={`/${locale}/conditionsOfUse`}>
              <p className="conditionalsLabel">{t('conditions')}</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
