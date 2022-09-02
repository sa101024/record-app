import RecordList from '../../components/RecordList'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'records',
    ['uid', '==', user.uid],
    ['startDate', 'desc']
  )

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <RecordList records={documents} />}
    </div>
  )
}
