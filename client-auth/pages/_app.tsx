import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import "./components/globals.css";

import { userService } from './services';
import { Nav, Alert } from './components';

import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
export default App;

function App({ Component, pageProps }) {
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
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Mon Banzaii</title>
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
        </>
    );
}
