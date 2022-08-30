// styles & images
import styles from './Avatar.module.css' 
import defaultUserAvatar from '../assets/default-user-avatar.svg'

export default function Avatar({ src }) {
  return (
    <div className={styles.avatar}>
      {src != null ? <img src={src} alt='user avatar' /> : <img src={defaultUserAvatar} alt='deault user avatar' className={styles['default-user-avatar']}/>}
    </div>
  )
}
