import Link from "next/link";
import { ConnectButton, DisconnectButton, RegisterButton } from "./buttons/buttonWidget";
import { userAuthService } from "@/services";
import { BehaviorSubject } from "rxjs";

export function HomeInteractionFromAuthDialog(){

  // Let's simplify the constant name
  // In a global context It's important to know what
  // it's related to, the authentication of the User,
  // in this local context we already know we're
  // talking about the user, so let's name
  // the variable `authSystem`.
  const authSystem = userAuthService

  // First of all, we need to manage if the user is connected
  // or if it's his "first time" accessing the root page.
  //
  // Technically speaking, we ask if the `authSystem.userValue` is null.
  // If it is, it means it hasn't been set up => no transaction with
  // the database has been handled => no request has been created
  // => He isn't connected or all the above actions haven't been
  // registered which would mean a pretty big bug

  // `dialogFinished` is here to let us jump from
  // multiple conditions, if necessary.
  // We use the waterfall concept while doing checks
  // doing this lets us skip all the other conditions
  // when one is met and jump to the return instruction
  // to create the element and send it to the browser.
  var dialogFinished;
  var homeInteraction;

  console.log("isLoggedOut:", authSystem.isLoggedOut);

  if (authSystem.isLoggedOut) {
    // The user is indeed logged out of the page
    // or has been registered as being so.
    dialogFinished = true;
    homeInteraction = <AuthDialogLoggedOut />;
  }

  if (!dialogFinished) {
    console.log(authSystem.userValue);
    if (authSystem.userValue ? null : false) {
      // The userValue is null
      // We interpret it as the user not being connected
      // Let's give him the corresponding dialog

      homeInteraction = <AuthDialogNotLoggedIn />
    } else {
      // The userValue isn't null
      // We interpret is as the user being connected
      // Let's give him the corresponding dialog
      console.log("userValue type", typeof authSystem.userValue);

      homeInteraction = <AuthDialogLoggedIn username={authSystem.userValue?.username}/>
    }
  }

  // At this point, we should have set the `homeInteraction` variable
  // either way to display something.
  return (
    <div className="container">
      {homeInteraction}
    </div>
  )
}


// ---------------------------------------------------------------------
//
// Below are the props used to construct the conditional boxes above
// If they're in this section, they should not be exported and aren't
// meant to be. Please refrain from doing so.
//
// ----------------------------------------------------------------------

function AuthDialogNotLoggedIn(){
  // User is not logged in
  // Let's state it and redirect him
  // to either the login page or the
  // register page
  return (
    <>
      <div>
        <h1>Dear User,</h1> <br />
        It seems you&apos;re not yet connected.
      </div>
      <div>
        <ConnectButton /> or <RegisterButton />
      </div>
    </>
  )
}

function AuthDialogLoggedIn({username}: {
  username: string
}){
  // User is logged in
  // Let's state it
  // For now, nothing happens
  // but in the future, it should
  // show the user account, etc.
  return (
    <>
      <div>
        <h1>Dear {username},</h1> <br />
        It seems you&apos;re connected.
      </div>
    </>
  )
}

function AuthDialogLoggedOut() {
  // User has been logged out
  // either forcefully or the
  // user was the one doing it
  // Let's state it and redirect him
  // to the login page
  return (
    <>
      <div>
        <h1>Dear User,</h1> <br />
        It seems you&apos;ve logged out.
      </div>
      <div>
        Maybe you&apos;d like to <ConnectButton />
      </div>
    </>
  )
}
