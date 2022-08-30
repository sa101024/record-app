import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Create.module.css'

export default function Create() {
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('records');
  const navigate = useNavigate();
  const [startDate, setStartDate] =useState('');
  const [title, setTitle] = useState(''); 
  const [details, setDetails] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add new document
    const record = {
      id: Math.random(),
      uid: user.uid,
      startDate,
      title,
      details,
      progress: []
    }

    await addDocument(record)
    if (!response.error) {
      navigate('/')
    }
  } 

  return (
    <div className={styles['create-form']}>
      <h2 className="page-title">Add record</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Start date:</span>
          <input
            required
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
        </label>
        <label>
          <span>Title:</span>
          <input
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <button className='btn'>Add record</button>
      </form>
    </div>
  )
}
