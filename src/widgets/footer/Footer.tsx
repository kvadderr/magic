export const Footer = () => {
    return (
        <footer className="container">
            <div className="containerFooter">
                <div>
                    <div className="headerFooter">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="12" r="12" fill="#41FE6B"></circle>
                            <circle cx="12" cy="12" r="6" fill="#41FE6B"></circle>
                        </svg>
                        <p className="titleFooter">
                            Online
                        </p>
                    </div>
                    <p className="labelCountFooter">
                        500 / 1000
                    </p>
                    <div className="footerBox"></div>
                </div>
                <div className="bottomFooter">
                    <div><p>Размещенная на настоящем сайте информация носит исключительно информационный характер
                        и ни при каких условиях не является публичной офертой, определяемой положениями ч. 2 ст. 437 ГК
                        РФ.</p></div>
                    <div className="infoRightBootomFooter">
                        <div className=" css-fha5fx-container"><span id="react-select-2-live-region"
                                                                     className="css-7pg0cj-a11yText"></span><span
                            aria-live="polite" aria-atomic="false" aria-relevant="additions text"
                            className="css-7pg0cj-a11yText"></span>
                        </div>
                        <div className="contactsFooter">
                            <a href="https://vk.com/magicowrust" target="_blank">
                                <img
                                    src="https://storage.yandexcloud.net/magicow-rust/VK-2.svg"
                                    className="iconContactFooter"/>
                            </a>
                            <a href="https://discord.gg/magicrust"
                               target="_blank">
                                <img
                                    src="https://storage.yandexcloud.net/magicow-rust/discord.svg"
                                    className="iconContactFooter"/>
                            </a>
                            <a href="https://t.me/magicrust" target="_blank">
                                <img
                                    src="https://storage.yandexcloud.net/magicow-rust/telegram.svg"
                                    className="iconContactFooter"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="bottomFooter bottomDopInfo">
                    <div>
                        <p>INTERNATIONAL BUSINESS SYSTEMS S.R.L.<br/>Reg. number:<br/>3-102-693823<br/>Beneficiary's
                            address:<br/>SAN JOSE-SANTA ANA,THREE HUNDRED AND FIFTY METERS OF THE RESTAURANT CEVICHE DEL
                            REY,<br/>COSTA-RICA
                        </p>
                    </div>
                    <div className="listBottom"><a href="/privacyPolicy"><p className="conditionalsLabel">Политика
                        конфиденциональности</p></a><a href="/termOfUse"><p
                        className="conditionalsLabel">Пользовательское соглашение</p></a><a href="/conditionsOfUse"><p
                        className="conditionalsLabel">Условия использовавания</p></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}