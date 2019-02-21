import React from 'react';
import ControlContainer from './ControlContainer';
import StudentContainer from './StudentContainer';
import styles from './Dashboard.module.css';
import StudentModal from './StudentModal';

const numStudents = 30;

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.pickStudent = this.pickStudent.bind(this);
    this.saveList = this.saveList.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    const controls = [
      { name: 'Pick Student', action: this.pickStudent },
      { name: 'Save List', action: this.saveList },
    ];

    this.state = Object.assign({}, { numStudents, controls, showModal: false, lastId: 0 }, this.createStudents(numStudents))

  }

  pickStudent() {
    if (this.state.unpickedStudents.length !== 0) {
      this.setState((prevState) => {
        const rndIndex = ~~(Math.random() * this.state.unpickedStudents.length);
        const studentId = prevState.unpickedStudents[rndIndex];
        const newUnpickedStudents = prevState.unpickedStudents.filter((_, idx) => idx !== rndIndex)
        const newStudents = prevState.students.map(student => {
          if (student.id === studentId) {
            return { ...student, isPicked: true }
          } else {
            return { ...student }
          }
        })
        return { ...prevState, showModal: true, lastId: studentId, students: newStudents, unpickedStudents: newUnpickedStudents };
      });
    } else {
      alert('Out of students');
    }
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  saveList() {
    alert('Saving...');
  }

  updateNumberStudents(numStudents) {
    this.setState(() => this.createStudents(numStudents))
  }

  createStudents(numStudents) {
    const students = new Array(numStudents).fill().map((_, index) => ({
      id: index + 1,
      isPicked: false
    }));
    const unpickedStudents = new Array(numStudents).fill().map((_, index) => index + 1);

    return { students, unpickedStudents };
  }

  render() {
    return (
      <div styles={styles.dashboard}>
        <ControlContainer controls={this.state.controls} />
        <StudentContainer students={this.state.students} />
        <StudentModal toggleModal={this.toggleModal} showModal={this.state.showModal} id={this.state.lastId} />
      </div >
    )
  }
}

export default Dashboard;