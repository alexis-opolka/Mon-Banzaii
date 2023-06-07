import Link from 'next/link';
import Image from 'next/image';
import { userService } from './services';
import {
  HomeMessageUserLoggedIn, HomeMessageUserNotLoggedIn, HomeMessageUserLoggedOut,
  HomeInteractionUserLoggedIn, HomeInteractionUserNotLoggedIn, HomeInteractionUserLoggedOut } from './components/propsIt';
import { any } from 'prop-types';
import styles from './style.module.css';
import { HeaderLogo } from './components/logos';
export default function Home() {
  // First of all, we need to manage if the user is connected
  // or if it's his first time accessing the root page.
  //
  // Technically speaking, we ask if the `userService.userValue` is null
  // If it is, it means it hasn't been set up => no transaction with
  // the database has been handled => no request has been created
  // => He isn't connected or all the above actions haven't been
  // registered which would mean a pretty big bug

  var homeMessage;
  var homeInteraction;
  var dialogFinished;
  var isLoggedIn;

  console.log("isLoggedOut:", userService.isLoggedOut);

  if (userService.isLoggedOut) {
    dialogFinished = true;
    homeMessage = <HomeMessageUserLoggedOut />;
    homeInteraction= <HomeInteractionUserLoggedOut />;
  }


  if (!dialogFinished) {
    if (userService.userValue ? null : any) {
      // The userValue is null
      // We interpret it as the user not being connected
      // Let's say it and redirect him to the Login/Register page
      console.log("User seems to not be connected");

      // We set the corresponding homeMessage and
      // homeInteraction variables
      homeMessage = <HomeMessageUserNotLoggedIn />;
      homeInteraction= <HomeInteractionUserNotLoggedIn />;
    } else {
      // The userValue isn't null
      // We interpret it as the user being connected
      // Let's say it and, for now, do nothing else.
      console.log("User seems to be connected with the account:", userService.userValue.username);

      // We set the corresponding homeMessage and
      // homeInteraction variables
      homeMessage = <HomeMessageUserLoggedIn />;
      homeInteraction= <HomeInteractionUserLoggedIn />;
      isLoggedIn = true;
      console.log("user Status", isLoggedIn);
    }
  }

  function CreateUpperOutput(){
    if (isLoggedIn) {
      return (
        <></>
      )
    } else {
      return (
        <div className='w-full max-w-5xl justify-between font-mono lg:flex pt-4'>
          <HeaderLogo />
          <div className='pb-2 pt-4 pr-5 pl-5'>
            {homeInteraction}
          </div>
        </div>
      )
    }
  }

  return(
    <main className='flex min-h-screen flex-col items-center'>
      {CreateUpperOutput()}
      <div>
        <div className={styles.title}>
          Mon Banzaii
        </div>
      </div>

      <div>
        <div>
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
    </main>
  )
}
