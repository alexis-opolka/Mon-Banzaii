import Image from 'next/image';
import styles from '@/app/style.module.css'
import { HeaderLogo } from '@/app/component/logo/HeaderLogo';
import {ConnectButton} from '@/app/component/buttons/buttonWidget';
import { HomeInteractionFromAuthDialog } from './component/dialogBehaviour';


export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center '>
      <div className="w-full max-w-5xl justify-between font-mono lg:flex pt-4">
        <HeaderLogo />
        <div className='pb-2 pt-4 pr-5 pl-5'>
          <ConnectButton />
        </div>
      </div>

      <div>
        <div className={styles.title}>
          <p> titre a mettre </p>

        </div>
      </div>
      <div>
        <div className='justify-center '>
          <Image
            src="/logo.png"
            alt="Banzaii project logo"
            className="dark:invert"
            width={532}
            height={530}
            priority
          />
        </div>
      </div>
      <div id='test-auth-state'>
        <HomeInteractionFromAuthDialog />
      </div>
    </main>
  )
}
