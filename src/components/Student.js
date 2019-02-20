import React from 'react';
import styles from './Student.module.css';

const Student = ({student}) => (
    <div className={`${styles.student} ${student.isPicked ? styles.picked : styles.unpicked}`}>
      <p>{student.id}</p>
    </div>
  )


export default Student;