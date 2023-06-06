import Link from "next/link";

// Functions declaration
// Widgets used for the Authentication dialog
export function RedirectToLogin(){
  return (
      <Link href="/users/account/login">
        <button className="btn btn-primary">
          Log In
        </button>
      </Link>
  )
}

export function RedirectToRegister(){
  return (
    <Link href="/users/account/register">
      <button className="btn btn-primary">
        Register
      </button>
    </Link>
  )
}

// Widgets used for the admin dialog
export function RedirectToUserManagement() {
  return (
    <Link href="/users/">
      <button className="btn btn-primary">
        Manage Users
      </button>
    </Link>
  )
}

export const RedirectMe = {
  RedirectToRegister,
  RedirectToLogin,
  RedirectToUserManagement
}
