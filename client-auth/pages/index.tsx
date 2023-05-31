import Link from 'next/link';
import { userService } from './services';
import { HomeMessageUserLoggedIn, HomeMessageUserNotLoggedIn, HomeMessageUserLoggedOut } from './components/propsIt';
import { any } from 'prop-types';

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
  var dialogFinished;

  console.log("isLoggedOut:", userService.isLoggedOut);

  if (userService.isLoggedOut) {
    dialogFinished = true;
    homeMessage = <HomeMessageUserLoggedOut />
  }


  if (!dialogFinished) {
    if (userService.userValue ? null : any) {
      // The userValue is null
      // We interpret it as the user not being connected
      // Let's say it and redirect him to the Login/Register page
      console.log("User seems to not be connected");

      homeMessage = <HomeMessageUserNotLoggedIn />
    } else {
      // The userValue isn't null
      // We interpret it as the user being connected
      // Let's say it and, for now, do nothing else.
      console.log("User seems to be connected with the account:", userService.userValue.username);

      homeMessage = <HomeMessageUserLoggedIn />
    }
  }

  return(
    <div className='p-4'>
      <div className='container'>
        {homeMessage}
      </div>
    </div>
  )
}
