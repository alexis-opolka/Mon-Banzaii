import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createTheme, NextUIProvider, Text } from '@nextui-org/react';

import "./components/globals.css";
import "bootstrap/dist/css/bootstrap.css";

import { userService } from './services';
import { Nav, Alert } from './components';
import { nextUILightTheme } from './components/nextui';
import { Footer } from 'pages/components';

import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [router.asPath, router.events]);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/users/account/login', '/users/account/register', '/'];
        const path:string = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            // The user is not connected and is to be redirected
            // to the login page
            setAuthorized(false);
            router.push({
                pathname: '/users/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            // The user is connected
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Mon Banzaii</title>
            </Head>

            <NextUIProvider theme={nextUILightTheme}>
                <div className={`app-container ${user ? 'bg-light' : ''} h-full layout-container`} style={{ overflow: "-moz-hidden-unscrollable" }}>
                    <Nav />
                    <Alert />
                    {authorized &&
                        <Component {...pageProps} />
                    }
                    <Footer />
                </div>
            </NextUIProvider>
        </>
    );
}
