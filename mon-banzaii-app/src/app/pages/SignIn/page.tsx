import Image from 'next/image';
import styles from './style.module.css'
import {HeaderLogo} from '../../component/logo/HeaderLogo';
import Link from 'next/link';
import {ConnectButtum} from '../../component/buttum/ConnectButtum';
import {DisconnectButtum} from '../../component/buttum/DisconnectButtum';


export default function SignIn() {
  return (
    <main className='flex min-h-screen flex-col items-center '>
      <div className="w-full max-w-5xl justify-between font-mono lg:flex pt-4">
        <HeaderLogo />
      </div>

      <div>
        <div className="space-y-4 rounded-xl p-4 bg-gray-200 dark:bg-gray-800">
          <div className="w-96 rounded">
              <div className={styles.connection}>
                Connexion
              </div>
              <div className={styles.add_info_to_signin}>
                <form action="/send-data-here" method="post">
                  <label htmlFor="UserName" className={styles.UserName}>Nom d'utilisateur :</label>
                  <input type="text" id="UserName" name="UserName" className={styles.UserName_Box}/>

                  <label htmlFor="Password" className={styles.Password}> Mot de passe :</label>
                  <input type="text" id="Password" name="Password" className={styles.Password_Box}/>
                  <div className=''>
                    <button type="submit" className={styles.SignIn}>Identification</button>
                  </div>
                </form>
                <div className='pt-8'>
                  <hr />
                  <Link href='/pages/Register'>
                    <p className={styles.ConnectButtum}>
                      Si vous n'avait pas de compte :<code className="font-mono font-bold"> S'inscrire</code>
                    </p>
                  </Link> 
                </div>  
              </div>
          </div>  
        </div>  
      </div>
    </main>
    
    )
}
