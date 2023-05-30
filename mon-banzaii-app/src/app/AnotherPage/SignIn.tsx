import Image from 'next/image';
import styles from './style.module.css'
import {HeaderLogo} from '../component/logo/HeaderLogo';
import {ConnectButtum} from '../component/buttum/ConnectButtum';
import {DisconnectButtum} from '../component/buttum/DisconnectButtum';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center '>
      <div className="w-full max-w-5xl justify-between font-mono lg:flex pt-4">
        <HeaderLogo />
        <div className='pb-2 pt-4 pr-5 pl-5'>         
        <ConnectButtum />
        </div>
      </div>
    </main>
    
    )
}