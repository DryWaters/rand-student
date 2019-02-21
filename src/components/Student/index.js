import React from 'react';
import styles from '../../styles/components/Student/Student.module.css';

const Student = ({student, toggleStudent}) => (
    <div className={`${styles.student} ${student.isPicked ? styles.picked : styles.unpicked}`} onClick={()=>toggleStudent(student)}>
      <p>{student.id}</p>
    </div>
  )


export default Student;