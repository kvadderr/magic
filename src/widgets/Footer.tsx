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
        <div className="online-container">
          <div className="online">
            <div className="headerFooter">
              <OnlineIcon/>
              <p className="titleFooter">{t('online')}</p>
            </div>
            <p className="labelCountFooter">
              500 / 1000
            </p>
          </div>
          <ScaleOnline info={onlineMock}/>
        </div>
        <div className="bottomFooter">
          <p>{t('description')}</p>
          <div className="infoRightBootomFooter">
            <LangSelect/>
            <div className="contactsFooter">
              <Link href="https://vk.com/magicowrust" target="_blank">
                <svg className="iconContactFooter" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.7">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M13.1261 18.166C13.1261 18.166 13.5399 18.1158 13.753 17.9027C13.9411 17.6895 13.9286 17.3134 13.9286 17.3134C13.9286 17.3134 13.9035 15.5205 14.7561 15.2446C15.5961 14.9939 16.6619 16.9874 17.8028 17.7522C18.6679 18.329 19.3199 18.2036 19.3199 18.2036L22.3666 18.166C22.3666 18.166 23.959 18.0657 23.2067 16.837C23.144 16.7367 22.7679 15.9342 20.9498 14.2667C19.0315 12.5239 19.2823 12.8123 21.5767 9.80316C22.981 7.97261 23.5452 6.84419 23.3697 6.36775C23.2067 5.91638 22.1786 6.04176 22.1786 6.04176H18.7306C18.7306 6.04176 18.4799 6.00415 18.2918 6.11699C18.1037 6.22983 17.9909 6.49313 17.9909 6.49313C17.9909 6.49313 17.4518 7.89738 16.7245 9.10103C15.1949 11.6462 14.5931 11.7842 14.3423 11.6212C13.753 11.2576 13.9035 10.1417 13.9035 9.36433C13.9035 6.89435 14.2796 5.85369 13.1512 5.60294C12.7751 5.51517 12.5118 5.45248 11.5589 5.43994C10.3302 5.43994 9.30207 5.43994 8.71278 5.72831C8.3241 5.91638 8.02319 6.33014 8.21126 6.35521C8.43695 6.38029 8.951 6.48059 9.2143 6.85673C9.56536 7.32064 9.55283 8.37383 9.55283 8.37383C9.55283 8.37383 9.75343 11.2826 9.08892 11.6337C8.62502 11.8845 7.98558 11.3829 6.63148 9.07595C5.92935 7.89738 5.40276 6.5809 5.40276 6.5809C5.40276 6.5809 5.30245 6.33014 5.12692 6.20476C4.90124 6.0543 4.60033 6.00415 4.60033 6.00415L1.34045 6.02923C1.34045 6.02923 0.838933 6.02923 0.675939 6.24237C0.512945 6.43044 0.663401 6.81912 0.663401 6.81912C0.663401 6.81912 3.22115 12.6869 6.10488 15.6333C8.76293 18.3415 11.7595 18.166 11.7595 18.166H13.1261Z"
                          fill="#8774B8"/>
                  </g>
                </svg>
              </Link>
              <Link href="https://discord.gg/magicrust"
                    target="_blank">
                <svg className="iconContactFooter" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.7">
                    <path
                      d="M18.9676 6.17006C17.6839 5.57509 16.3113 5.1427 14.8763 4.89648C14.7001 5.21212 14.4942 5.63665 14.3522 5.97437C12.8268 5.74712 11.3154 5.74712 9.818 5.97437C9.67607 5.63665 9.46551 5.21212 9.28769 4.89648C7.85115 5.1427 6.477 5.57668 5.19331 6.17321C2.6041 10.0491 1.90221 13.8288 2.25316 17.5547C3.97046 18.8251 5.63473 19.5969 7.27091 20.1019C7.67489 19.5511 8.03519 18.9656 8.34558 18.3485C7.75443 18.126 7.18824 17.8514 6.65326 17.5327C6.79519 17.4285 6.93402 17.3196 7.06814 17.2075C10.3312 18.7194 13.8765 18.7194 17.1005 17.2075C17.2362 17.3196 17.375 17.4285 17.5154 17.5327C16.9789 17.853 16.4111 18.1276 15.82 18.3501C16.1304 18.9656 16.4891 19.5527 16.8946 20.1034C18.5324 19.5984 20.1982 18.8267 21.9155 17.5547C22.3273 13.2354 21.2121 9.49045 18.9676 6.17006ZM8.79012 15.2633C7.81059 15.2633 7.0073 14.3574 7.0073 13.2543C7.0073 12.1512 7.79344 11.2438 8.79012 11.2438C9.78682 11.2438 10.5901 12.1496 10.5729 13.2543C10.5745 14.3574 9.78682 15.2633 8.79012 15.2633ZM15.3786 15.2633C14.399 15.2633 13.5957 14.3574 13.5957 13.2543C13.5957 12.1512 14.3819 11.2438 15.3786 11.2438C16.3752 11.2438 17.1785 12.1496 17.1614 13.2543C17.1614 14.3574 16.3752 15.2633 15.3786 15.2633Z"
                      fill="#8774B8"/>
                  </g>
                </svg>
              </Link>
              <Link href="https://t.me/magicrust" target="_blank">
                <svg className="iconContactFooter" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.7">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.9733 3.76157L17.3997 19.1697C17.3845 19.2635 17.3484 19.3527 17.2939 19.4305C17.2394 19.5084 17.168 19.5729 17.085 19.6192C17.0007 19.6689 16.9058 19.6979 16.8081 19.7037C16.7104 19.7096 16.6127 19.6922 16.523 19.6529L11.9827 17.7986L9.55513 20.7543C9.44274 20.9116 9.27416 20.9903 9.06063 20.9903C8.95618 20.991 8.85321 20.9657 8.761 20.9166C8.66879 20.8676 8.59023 20.7963 8.53242 20.7093C8.45911 20.6038 8.41989 20.4783 8.42003 20.3497V16.832L17.0962 6.21158L6.36337 15.4946L2.40739 13.8763C2.28887 13.838 2.18569 13.7628 2.11291 13.6617C2.04013 13.5606 2.00155 13.4389 2.0028 13.3144C1.99135 13.1967 2.01516 13.0783 2.0712 12.9743C2.12723 12.8702 2.21297 12.7852 2.31748 12.73L19.0292 3.0985C19.1317 3.03651 19.25 3.00563 19.3697 3.00962C19.4895 3.01361 19.6054 3.0523 19.7036 3.12097C19.9283 3.27831 20.0182 3.49185 19.9845 3.76157H19.9733Z"
                          fill="#8774B8"/>
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottomFooter bottomDopInfo">
          <div>
            <p>
              EZ Tech Limited <br/>
              Company No. 123041 <br/>
              Registered at Suite 4.3.02, Block 4, Eurotowers<br/>
              GX11 1AA, Gibraltar<br/>
            </p>
          </div>
          <div className="listBottom">
            <Link href="/documents/policy.pdf">
              <p className="conditionalsLabel">{t('privacy_policy')}</p>
            </Link>
            <Link href="/documents/terms.pdf">
              <p className="conditionalsLabel">{t('terms')}</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
