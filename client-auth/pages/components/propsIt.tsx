import { RedirectToLogin, RedirectToUserManagement, RedirectToRegister } from "./buttonWidget";
import { userService } from "pages/services";
import { Text } from "@nextui-org/react";

export function HomeMessageUserNotLoggedIn(){

  return (
    <>
      <div>
        <h1>Dear User,</h1> <br />
        It seems you&apos;re not yet connected.
      </div>
    </>
  )
}

export function HomeInteractionUserNotLoggedIn(){
  return (
    <div>
      <RedirectToLogin /> or <RedirectToRegister />
    </div>
  )
}

export function HomeMessageUserLoggedIn() {

  return (
    <>
      <div>
        <h1>Dear {userService.userValue?.username},</h1> <br />
        It seems you&apos;re connected.
      </div>
    </>
  )
}

export function HomeInteractionUserLoggedIn(){
  return (
    <div>
      <RedirectToUserManagement />
    </div>
  )
}

export function HomeMessageUserLoggedOut() {

  return (
    <>
      <div>
        <h1>Dear User,</h1> <br />
        It seems you&apos;ve logged out.
      </div>
    </>
  )
}

export function HomeInteractionUserLoggedOut(){
  return (
    <Text color="$TitleColor">
      Maybe you&apos;d like to <RedirectToLogin />
    </Text>
  )
}
