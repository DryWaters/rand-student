import React from 'react';
import ControlContainer from './ControlContainer';
import StudentContainer from './StudentContainer';
import styles from './Dashboard.module.css';

const students = new Array(31).fill().map((_, index) => ({
  id: index + 1,
  isPicked: false
}));
const unpickedStudents = new Array(31).fill().map((_, index) => index + 1);

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.pickStudent = this.pickStudent.bind(this);
    this.saveList = this.saveList.bind(this);

    const controls = [
      { name: 'Pick Student', action: this.pickStudent },
      { name: 'Save List', action: this.saveList },
    ];

    this.state = {
      students,
      controls,
      unpickedStudents
    }
  }

  pickStudent() {
    if (this.state.unpickedStudents.length !== 0) {
      this.setState((state) => {
        const rndIndex = ~~(Math.random() * this.state.unpickedStudents.length);
        const studentId = state.unpickedStudents[rndIndex];
        const newUnpickedStudents = state.unpickedStudents.filter((_, idx) => idx !== rndIndex)
        const newStudents = state.students.map(student => {
          if (student.id === studentId) {
            return { ...student, isPicked: true }
          } else {
            return {...student}
          }
      })

    return { ...state, students: newStudents, unpickedStudents: newUnpickedStudents };
    });
  } else {
  alert('Out of students');
}
  }

saveList() {
  alert('Saving...');
}

render() {
  return (
    <div styles={styles.dashboard}>
      <ControlContainer controls={this.state.controls} />
      <StudentContainer students={this.state.students} />
    </div >
  )
}
}

export default Dashboard;