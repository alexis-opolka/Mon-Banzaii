import Link from "next/link";
import { RedirectToLogin, RedirectToUserManagement, RedirectToRegister } from "../buttons/buttonWidget";
import { userService } from "pages/services";

export function HomeMessageUserNotLoggedIn(){

  return (
    <>
      <div>
        <h1>Dear User,</h1> <br />
        It seems you're not yet connected.
      </div>
      <div>
        <RedirectToLogin /> or <RedirectToRegister />
      </div>
    </>
  )
}

export function HomeMessageUserLoggedIn() {

  return (
    <>
      <div>
        <h1>Dear {userService.userValue?.username},</h1> <br />
        It seems you're connected.
      </div>
      <div>
        <RedirectToUserManagement />
      </div>
    </>
  )
}

export function HomeMessageUserLoggedOut() {

  return (
    <>
      <div>
        <h1>Dear User,</h1> <br />
        It seems you've logged out.
      </div>
      <div>
        Maybe you'd like to <RedirectToLogin />
      </div>
    </>
  )
}
