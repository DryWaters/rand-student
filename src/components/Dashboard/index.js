import React from 'react';
import ControlContainer from '../ControlContainer';
import StudentContainer from '../StudentContainer';
import styles from '../../styles/components/Dashboard/Dashboard.module.css';

const constants = {
  defaultNumStudents: 30,
  minStudents: 0,
  maxStudents: 100,
  minSection: 1,
  maxSection: 3
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this._pickStudent = this._pickStudent.bind(this);
    this._saveList = this._saveList.bind(this);
    this._updateStudents = this._updateStudents.bind(this);
    this._toggleSpeech = this._toggleSpeech.bind(this);
    this._toggleStudent = this._toggleStudent.bind(this);
    this._updateSection = this._updateSection.bind(this);

    this.buttons = [
      { name: 'Pick Student', action: this._pickStudent },
      { name: 'Save List', action: this._saveList },
      { name: 'Sound', action: this._toggleSpeech }
    ];

    this.inputs = [
      { name: 'Section', min: constants.minSection, max: constants.maxSection, action: this._updateSection },
      { name: 'Students', min: constants.minStudents, max: constants.maxStudents, action: this._updateStudents }
    ];

    this.state = Object.assign({},
      {
        numStudents: constants.defaultNumStudents,
        section: constants.minSection,
        speech: true,
      }, this.createStudents(constants.defaultNumStudents))

  }

  // method for picking a random student
  _pickStudent() {

    // if still have a student that can be picked
    if (this.state.unpickedStudents.length !== 0) {

      this.setState((prevState) => {

        // get a random index from the list of unpicked students
        const rndIndex = ~~(Math.random() * prevState.unpickedStudents.length);
        const studentId = prevState.unpickedStudents[rndIndex];

        // if speech is enabled and browser supported, speak the ID of the picked student
        if (prevState.speech && 'speechSynthesis' in window) {
          this.speak(studentId);
        }

        // remove new picked student from possible unpicked lists
        const newUnpickedStudents = prevState.unpickedStudents.filter((_, idx) => idx !== rndIndex)

        // update the state for the student that was picked
        const newStudents = prevState.students.map(student => {
          if (student.id === studentId) {
            return { ...student, status: 'selected' }
          } else {
            return { ...student }
          }
        });

        // set student from selected to picked after 5 seconds
        setTimeout(this.clearStudentSelectedState.bind(this, studentId), 5000);

        // set the state with the selected student, removed from possible students
        return { ...prevState, students: newStudents, unpickedStudents: newUnpickedStudents };
      });

    } else {
      alert('Out of students');
    }
  }

  // helper function that changes student status from selected to picked 
  clearStudentSelectedState(studentId) {
    this.setState(prevState => {
      const newStudents = prevState.students.map(student => {
        if (student.id === studentId) {
          return { ...student, status: 'picked' }
        } else {
          return { ...student }
        }
      });
      return { students: newStudents }
    });
  }

  // helper function to speak the student id
  speak(studentId) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    msg.text = "" + studentId;
    msg.lang = 'en-US';
    msg.volume = 1
    speechSynthesis.speak(msg);
  }

  // method to save the current section of picked students to a CSV file
  _saveList() {
    var a = document.createElement("a");
    var file = new Blob([this.createCSV()], { type: "text/csv" });
    a.href = URL.createObjectURL(file);
    a.download = "students.csv";
    a.click();
    a = null;
  }

  // helper function to create the output of the CSV string
  createCSV() {
    let output = (new Date()).toLocaleTimeString() + '\npicked students';
    output += this.state.students.filter(student => student.isPicked).map(student => `\n${student.id}`)
    return output
  }

  // method to create a new list of students if valid amount in range, set in constants
  // at top of file
  _updateStudents(numStudents) {
    const intStudents = parseInt(numStudents);
    if (!isNaN(intStudents) && intStudents >= constants.minStudents && intStudents <= constants.maxStudents) {
      const intStudents = parseInt(numStudents);
      this.setState(() => this.createStudents(intStudents))
    }
  }

  // helper function that create a new list of students and resets status to unpicked
  createStudents(numStudents) {
    const students = new Array(numStudents).fill().map((_, index) => ({
      id: index + 1,
      status: 'unpicked'
    }));
    const unpickedStudents = new Array(numStudents).fill().map((_, index) => index + 1);
    return { students, unpickedStudents, numStudents };
  }

  // method that toggles if user wants speech enabled
  _toggleSpeech() {
    this.setState(prevState => ({ speech: !prevState.speech }));
  }

  // method for random selected student
  _toggleStudent(selStudent) {
    if (selStudent.status === 'picked') {
      this.setState(prevState => {
        const newUnpickedStudents = [...prevState.unpickedStudents, selStudent.id];
        const newStudents = prevState.students.map(student => {
          if (student.id === selStudent.id) {
            return { ...student, status: 'unpicked' }
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
            return { ...student, status: 'picked' }
          } else {
            return { ...student }
          }
        });
        return { ...prevState, unpickedStudents: newUnpickedStudents, students: newStudents }
      })
    }
  }

  // Updates section if within valid range as defined in constants above
  _updateSection(section) {
    const intSection = parseInt(section);
    if (!isNaN(intSection) && intSection >= constants.minSection && intSection <= constants.maxSection) {
      this.setState(() => ({ section: intSection }));
    }
  }








  render() {
    return (
      <div styles={styles.dashboard}>
        <ControlContainer buttons={this.buttons} inputs={this.inputs} section={this.state.section} numStudents={this.state.numStudents} speech={this.state.speech} />
        <StudentContainer students={this.state.students} toggleStudent={this._toggleStudent} />
      </div >
    )
  }
}

export default Dashboard;