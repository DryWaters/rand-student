import React from 'react';
import ControlContainer from './ControlContainer';
import StudentContainer from './StudentContainer';
import lsUtils from '../utils/localstorageUtils';
import constants from '../utils/constants'
import styles from '../styles/components/Dashboard.module.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this._pickStudent = this._pickStudent.bind(this);
    this._saveList = this._saveList.bind(this);
    this._updateStudents = this._updateStudents.bind(this);
    this._toggleSpeech = this._toggleSpeech.bind(this);
    this._toggleStudent = this._toggleStudent.bind(this);
    this._updateSection = this._updateSection.bind(this);

    this.inputs = [
      { name: 'Section', min: constants.minSection, max: constants.maxSection, action: this._updateSection },
      { name: 'Students', min: constants.minStudents, max: constants.maxStudents, action: this._updateStudents }
    ];

    this.state = Object.assign({},
      {
        numStudents: constants.defaultNumStudents,
        section: constants.minSection,
        speech: true,
        day: new Date().getDate()
      }, this.createStudents(constants.defaultNumStudents))

  }

  componentDidMount() {
    if (this.shouldLoadSection(constants.minSection)) {
      this.loadSection(constants.minSection);
    }
  }

  shouldLoadSection(section) {
    const lsAvailable = lsUtils.isLocalStorageAvailable();
    this.setState(() => ({ lsAvailable }));
    return lsAvailable && lsUtils.isSectionCurrent(section);
  }

  loadSection(section) {
    const oldState = lsUtils.loadSection(section);
    this.setState(() => oldState);
  }

  saveSection() {
    if (this.state.lsAvailable) {
      lsUtils.saveSection(this.state);
    }
  }

  componentDidUpdate() {
    this.saveSection()
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
    if (this.state.lsAvailable) {
      lsUtils.saveList()
    }
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
    return { students, unpickedStudents };
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
      if (this.shouldLoadSection(section)) {
        this.loadSection(section);
      } else {
        this._updateStudents(constants.defaultNumStudents);
        this.setState(() => ({ section: intSection }));
      }
    }
  }

  render() {
    return (
      <div styles={styles.dashboard}>
        <ControlContainer inputs={this.inputs} section={this.state.section} numStudents={this.state.numStudents} />
        <StudentContainer />
      </div >
    )
  }
}

export default Dashboard;