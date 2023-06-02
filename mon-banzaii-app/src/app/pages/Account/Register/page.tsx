import Image from 'next/image';
import styles from './style.module.css'
import {HeaderLogo} from '../../../component/logo/HeaderLogo';
import Link from 'next/link';
import {ConnectButtum} from '../../../component/buttons/ConnectButton';
import {DisconnectButtum} from '../../../component/buttons/DisconnectButton';


export default function Register() {
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
                <form action="/send-data-here" method="post" className={styles.form}>
                  <label htmlFor="UserName" className={styles.part_off_register}>Nom d'utilisateur :</label>
                  <input type="text" id="UserName" name="UserName"/>

                  <label htmlFor="Email" className={styles.part_off_register}>Adresse mail :</label>
                  <input type="text" id="Email" name="Email"/>

                  <label htmlFor="Password" className={styles.part_off_register}>Mot de passe</label>
                  <input type="text" id="UserName" name="Password"/>

                  <label htmlFor="Password_confirmation" className={styles.part_off_register}>Confirmé le mot de passe :</label>
                  <input type="text" id="Password_Confirmation" name="Password_Confirmation"/>
                  <div className=''>
                    <button type="submit" className={styles.SignIn}>Crée le compte</button>
                  </div>
                </form>
                <div className='pt-8'>
                  <hr />
                  <Link href='/pages/SignIn'>
                    <p className={styles.ConnectButtum}>
                      Si vous avait de compte :<code className="font-mono font-bold"> Se Connecter </code>
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
