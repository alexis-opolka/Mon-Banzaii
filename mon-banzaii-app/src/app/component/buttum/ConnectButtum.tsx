import styles from './buttons.module.css'

export function ConnectButtum() {
    return (
        <a href='/*'>
            <p className={styles.button}>
                <code className="font-mono font-bold">Se Connecter</code>
            </p>
        </a>
    )
  }