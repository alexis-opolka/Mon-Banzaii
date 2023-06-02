import Link from "next/link";
import styles from './buttons.module.css'

// Functions declaration
// Widgets used for the Authentication dialog
export function RegisterButton() {
  return (
    <>
    <Link href='/pages/Accounts/Register'>
      <p className={styles.ConnectButton}>
          <code className="font-mono font-bold">S&apos;enregistrer</code>
      </p>
    </Link>
    </>
  )
}

export function ConnectButton() {
  return (
    <>
      <Link href='/pages/Account/SignIn'>
        <p className={styles.ConnectButton}>
          <code className="font-mono font-bold">Se Connecter</code>
        </p>
      </Link>
    </>
  )
}

export function DisconnectButton() {
  return (
    <a href='/'>
      <p className={styles.DisconnectButton}>
        <code className="font-mono font-bold">Se Déconnecter</code>
      </p>
    </a>
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
