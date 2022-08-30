import { Link } from 'react-router-dom'

// styles
import './RecordList.css'

export default function RecordList({ records }) {

  return (
    <div className='record-list'>
      {records.length === 0 && <p>No records yet</p>}
      {records.map(record => (
        <Link
          to={`/records/${record.id}`}
          key={record.id}
        >
          <h4>{record.title}</h4>
          <p>Start at {record.startDate}</p>
          <p>{record.details.substring(0,30)}...</p>
        </Link>
      ))}
    </div>
  )
}
