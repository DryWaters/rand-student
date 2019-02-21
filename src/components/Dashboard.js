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
    this.updateStudents = this.updateStudents.bind(this);
    this.toggleSpeech = this.toggleSpeech.bind(this);
    this.toggleStudent = this.toggleStudent.bind(this);

    const controls = [
      { name: 'Pick Student', action: this.pickStudent },
      { name: 'Save List', action: this.saveList },
      { name: 'Sound', action: this.toggleSpeech }
    ];

    this.state = Object.assign({}, { numStudents, controls, showModal: false, lastId: 0, speech: true }, this.createStudents(numStudents))
  }

  pickStudent() {
    if (this.state.unpickedStudents.length !== 0) {
      this.setState((prevState) => {
        const rndIndex = ~~(Math.random() * this.state.unpickedStudents.length);
        const studentId = prevState.unpickedStudents[rndIndex];
        if (prevState.speech && 'speechSynthesis' in window) {
          this.speak(studentId);
        }
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

  toggleSpeech() {
    this.setState(prevState => ({ speech: !prevState.speech }));
  }

  speak(studentId) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    msg.text = "" + studentId;
    msg.lang = 'en-US';
    msg.volume = 1
    speechSynthesis.speak(msg);
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  saveList() {
    var a = document.createElement("a");
    var file = new Blob([this.createCSV()], { type: "text/csv" });
    a.href = URL.createObjectURL(file);
    a.download = "students.csv";
    a.click();
    a = null;
  }

  createCSV() {
    let output = (new Date()).toLocaleTimeString() + '\npicked students';
    output += this.state.students.filter(student => student.isPicked).map(student => `\n${student.id}`)
    return output
  }

  updateStudents(numStudents) {
    if (!isNaN(parseInt(numStudents)) && parseInt(numStudents) > 0) {
      const intStudents = parseInt(numStudents);
      this.setState(() => this.createStudents(intStudents))
    }
  }

  createStudents(numStudents) {
    const students = new Array(numStudents).fill().map((_, index) => ({
      id: index + 1,
      isPicked: false
    }));
    const unpickedStudents = new Array(numStudents).fill().map((_, index) => index + 1);
    return { students, unpickedStudents, numStudents, lastId: 0 };
  }

  toggleStudent(selStudent) {
    if (selStudent.isPicked) {
      this.setState(prevState => {
        const newUnpickedStudents = [...prevState.unpickedStudents, selStudent.id];
        const newStudents = prevState.students.map(student => {
          if (student.id === selStudent.id) {
            return { ...student, isPicked: false }
          } else {
            return { ...student }
          }
        });
        return { ...prevState, unpickedStudents: newUnpickedStudents, students: newStudents }
      });
    } else {
      this.setState(prevState => {
        const newUnpickedStudents = prevState.unpickedStudents.filter(id => id !== selStudent.id)
        const newStudents = prevState.students.map(student => {
          if (student.id === selStudent.id) {
            return { ...student, isPicked: true }
          } else {
            return { ...student }
          }
        });
        return { ...prevState, unpickedStudents: newUnpickedStudents, students: newStudents }
      })
    }
  }

  render() {
    return (
      <div styles={styles.dashboard}>
        <ControlContainer controls={this.state.controls} numStudents={this.state.numStudents} updateStudents={this.updateStudents} speech={this.state.speech} />
        <StudentContainer students={this.state.students} toggleStudent={this.toggleStudent} />
        <StudentModal toggleModal={this.toggleModal} showModal={this.state.showModal} id={this.state.lastId} />
      </div >
    )
  }
}

export default Dashboard;