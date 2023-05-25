import Image from 'next/image';
import styles from './style.module.css'
import {headerLogo} from './component/logo/headerLogo';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center '>
      <div className="w-full max-w-5xl justify-between font-mono lg:flex pt-4">
        <headerLogo />
        <div className='pb-2 pt-4 pr-5 pl-5'>         
        <p className={styles.button}>
            <code className="font-mono font-bold">Se Connecter</code>
          </p>
        </div>
      </div>
      
      <div>
        <div className={styles.title}>
          <p> titre a mettre </p>

        </div>       
      </div>
      <div className=''>
        <div className='justify-center '> 
          <Image
            src="/logo.png"
            alt="Banzaii project logo"
            className="dark:invert"
            width={500}
            height={24}
            priority
          />
        </div>
      </div>
    </main>
  )
}