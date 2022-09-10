import { useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { Timestamp } from 'firebase/firestore'

export default function RecordProgress({ record }) {
  const { updateDocument, response } = useFirestore('records')
  const [latestProgress, setLatestProgress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const progressToAdd = {
      content: latestProgress,
      progressAddedAt: Timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(record.id, {
      progress: [...record.progress, progressToAdd]
    });
    if (!response.error) {
      setLatestProgress('')
    }
  };

  return (
    <div className="record-progress">
      <h4>Record Your Progress</h4>
      
      <ul className="progress-list">
        {record.progress.length > 0 && record.progress.map(p => (
          <li key={p.id}>
            <div className="progress-date">
              <p>{formatDistanceToNow(p.progressAddedAt.toDate(), { addSuffix: true })}</p>
            </div>
            <div className="progress-content">
              <p>{p.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="progress-form" onSubmit={handleSubmit}>
        <label>
          <span>Add a progress:</span>
          <textarea
            required
            onChange={(e) => setLatestProgress(e.target.value)}
            value={latestProgress}
          ></textarea>
        </label>
        <button className="btn">Add latest progress</button>
      </form>
    </div>
  )
}
