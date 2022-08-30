import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import RecordSummary from './RecordSummary';
import RecordProgress from './RecordProgress';

// styles
import './Record.css'

export default function Record() {
  const { id } = useParams()
  const { error, document } = useDocument('records', id)

  if (error) {
    return <div className='error'>{error}</div>
  }
  if (!document) {
    return <div className='loading'>Loading...</div>
  }
  
  return(
    <div className='record-details'>
      <RecordSummary record={document}/>
      <RecordProgress record={document}/>
    </div>
  )
}
