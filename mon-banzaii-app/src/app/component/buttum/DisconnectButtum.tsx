import styles from './buttons.module.css'

export function DisconnectButtum() {
    return (
        <a href='/'>
            <p className={styles.DisconnectButtum}>
                <code className="font-mono font-bold">Se Déconnecter</code>
            </p>
        </a>
    )
  }