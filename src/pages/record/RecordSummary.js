import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"

export default function RecordSummary({record}) {
  const navigate = useNavigate()
  const { deleteDocument } = useFirestore('records')

  const handleClick = () => {
    deleteDocument(record.id)
    navigate('/')
  }
  
  return (
    <div>
      <div className="record-summary">
        <h2 className="page-title">{record.title}</h2>
        <p className="start-date">Start at {record.startDate}</p>
        <p className="details">{record.details}</p>
      </div>
      <button className="btn" onClick={handleClick}>Completed</button>
    </div>
  )
}
