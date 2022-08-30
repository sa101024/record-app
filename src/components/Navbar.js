import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={styles.navbar}>
      <ul>
        <div className={styles.title}>
          <li>Record-App</li>
        </div>
        <div className={styles.links}>
          {!user && 
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </>
          }
          {user && (
            <li>
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}
              {isPending && <button className="btn" disabled>Logging out...</button>}
            </li>
          )}
        </div>
      </ul>
    </div>
  )
}
