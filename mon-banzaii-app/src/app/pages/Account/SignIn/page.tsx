'use client'
import { createContext } from 'react'

const Context = createContext(null);


import styles from './style.module.css'
import {HeaderLogo} from '../../../component/logo/HeaderLogo';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { alertService, userAuthService } from '@/services';


export default function SignIn() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    passwordVerified: Yup.string().required('Password is required')
  });
  const formOptions = {
    resolver: yupResolver(validationSchema)
  };

  // Get the functions to build the form with the useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const {errors} = formState;

  function onSubmit(username: string, password: string, passwordVerified: string) {
    alertService.clear();

    if (password == passwordVerified) {
      return userAuthService.login(username, password)
      .then(() => {
        // Get to the root of the app => "/"
        const returnURL: string = process.env.HOST + "/";
        router.push(returnURL);
      })
      .catch(alertService.error);
    }
  }


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
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="UserName" className={styles.UserName}>Nom d&apos;utilisateur :</label>
                  <input type="text" id="UserName" name="UserName" className={styles.UserName_Box}/>
                  <div>{String(errors.username?.message || "")}</div>

                  <label className={styles.Password}> Mot de passe :</label>
                  <input type="password" {...register('password')} className={styles.password} />
                <div>{String(errors.password?.message || "")}</div>
                  <label className={styles.Password}> Mot de passe :</label>
                <input type="password" {...register('passwordVerified')} className={styles.password} />
                <div>{String(errors.passwordVerified?.message || "")}</div>
                  <div>
                    <button disabled={formState.isSubmitting} className={styles.SignIn}>
                      {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                      Identification
                    </button>
                  </div>
                </form>
                <div className='pt-8'>
                  <hr />
                  <p className={styles.ConnectButton}>
                      Vous n&apos;avez pas de compte ?
                      <Link href='/pages/Register'>
                        <code className="font-mono font-bold"> S&apos;inscrire</code>
                      </Link>
                    </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
    )
}
