import c from './style.module.scss';
import {useDepositContext} from '@/app/[locale]/deposit/deposit-provider';
import {useTranslations} from 'next-intl';
import {NotificationEvent} from "@/shared/components/NotificationEvent/NotificationEvent";
import {useEffect, useState} from "react";

export function Promocode() {
    const {activeType} = useDepositContext();
    const t = useTranslations('Deposit');
    const [show, setShow] = useState(false);
    const [value, set] = useState<string>();

    useEffect(() => {
        if (!show) return;

        const hideTimer = setTimeout(() => {
            set(false);
        }, 3000);

        return () => clearTimeout(hideTimer);
    }, [show]);

    return (
        <div className={c.container}>
            <label className={c.label}>
                <span>{t('promo_code')}</span>
                <input
                    onChange={ev => set(ev.currentTarget.value)}
                    className={c.input}
                    placeholder={t('promo_code_input')}
                    type="text"
                />
            </label>
            <button onClick={() => setShow(true)} disabled={!value} className={c.button}>
                {t('access')}
            </button>
            {show && <NotificationEvent variant="success">
                Промокод применен.
            </NotificationEvent>}
        </div>
    );
}
