import styles from './buttons.module.css'
import Link from 'next/link';


export function ConnectButtum() {
    return (
      
        <Link href='/AnotherPage/SignIn'>
            <p className={styles.ConnectButtum}>
                <code className="font-mono font-bold">Se Connecter</code>
            </p>
        </Link>
    )
  }