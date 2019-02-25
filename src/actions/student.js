import ACTION_TYPES from '../actions/actionTypes';

export const toggleSpeech = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SPEECH,
      payload: {
        speech: !getState().speech
      }
    })
  }
};

export const toggleStudent = (id) => {
  return (dispatch, getState) => {
    const newStudents = [...getState().students];
    let newUnpickedStudents;
    if (newStudents[id - 1].status === 'picked') {
      newStudents[id - 1].status = 'unpicked';
      newUnpickedStudents = [...getState().unpickedStudents, id];
    } else {
      newStudents[id - 1].status = 'picked';
      newUnpickedStudents = [...getState().unpickedStudents].filter(pickedId => pickedId !== id);
    }
    dispatch({
      type: ACTION_TYPES.TOGGLE_STUDENT,
      payload: {
        students: newStudents,
        unpickedStudents: newUnpickedStudents,
        numStudents: newUnpickedStudents.length
      }
    });
  }
};

export const pickStudent = () => {
  return (dispatch, getState) => {
    const state = getState();

    const length = state.unpickedStudents.length;
    // if still have a student that can be picked
    if (length !== 0) {

      // get a random index from the list of unpicked students
      const rndIndex = ~~(Math.random() * length);
      const studentId = state.unpickedStudents[rndIndex];

      // if speech is enabled and browser supported, speak the ID of the picked student
      if (state.speech && 'speechSynthesis' in window) {
        speak(studentId);
      }

      // remove new picked student from possible unpicked lists
      const newUnpickedStudents = state.unpickedStudents.filter((_, idx) => idx !== rndIndex)

      // update the state for the student that was picked
      const newStudents = state.students.map(student => {
        if (student.id === studentId) {
          return { ...student, status: 'selected' }
        } else {
          return { ...student }
        }
      });

      // set student from selected to picked after 5 seconds
      setTimeout(clearStudentSelectedState.bind(this, { dispatch, studentId, newStudents }), 5000);

      // set the state with the selected student, removed from possible students
      dispatch({
        type: ACTION_TYPES.PICK_STUDENT,
        payload: {
          students: newStudents,
          unpickedStudents: newUnpickedStudents,
          numStudents: newUnpickedStudents.length
        }
      });

    }
  }
};

export const setLocalStorage = () => {

}

export const loadSection = () => {

}

export const updateStudents = () => {

}

export const updateSection = () => {

}

// helper function that changes student status from selected to picked 
const clearStudentSelectedState = ({ dispatch, studentId, newStudents }) => {
  const clearedStudents = newStudents.slice();
  clearedStudents[studentId - 1].status = 'picked'
  return dispatch({
    type: ACTION_TYPES.PICK_STUDENT,
    payload: {
      students: clearedStudents
    }
  });
};

// helper function to speak the student id
const speak = (studentId) => {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0];
  msg.text = "" + studentId;
  msg.lang = 'en-US';
  msg.volume = 1
  speechSynthesis.speak(msg);
};
