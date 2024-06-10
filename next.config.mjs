/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.steamstatic.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.akamai.steamstatic.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'content.magicrust.ru',
                pathname: '/images/newshop/products/**',
            },
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                pathname: '/magicow-rust/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
