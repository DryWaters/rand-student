import * as ACTION_TYPES from '../actions/actionTypes';
import * as lsUtils from '../utils/localstorageUtils';
import CONSTANTS from '../utils/constants'

export const toggleSpeech = () => {
  return (dispatch, getState) => {
    const payload = {
      speech: !getState().speech
    };

    dispatch({
      type: ACTION_TYPES.TOGGLE_SPEECH,
      payload
    });
  }
};

export const toggleStudent = (id) => {
  return (dispatch, getState) => {
    const newStudents = [...getState().students];
    let newUnpickedStudents;

    // if student was already picked, then change to unpicked
    if (newStudents[id - 1].status === 'picked') {
      newStudents[id - 1].status = 'unpicked';
      newUnpickedStudents = [...getState().unpickedStudents, id];
    } else {
      newStudents[id - 1].status = 'picked';
      newUnpickedStudents = [...getState().unpickedStudents].filter(pickedId => pickedId !== id);
    }

    const payload = {
      students: newStudents,
      unpickedStudents: newUnpickedStudents,
    };

    dispatch({
      type: ACTION_TYPES.TOGGLE_STUDENT,
      payload
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
      setTimeout(clearStudentSelectedState.bind(this, { dispatch, studentId, getState }), CONSTANTS.timeoutTime);

      const payload = {
        students: newStudents,
        unpickedStudents: newUnpickedStudents,
      }

      dispatch({
        type: ACTION_TYPES.PICK_STUDENT,
        payload: payload
      });
    }
  }
};

// helper callback function to set selected student to picked
const clearStudentSelectedState = ({ dispatch, studentId, getState }) => {
  const clearedStudents = getState().students.slice();
  clearedStudents[studentId - 1].status = 'picked'

  const payload = {
    students: clearedStudents
  }

  return dispatch({
    type: ACTION_TYPES.PICK_STUDENT,
    payload
  });
};

export const updateStudents = (numStudents) => {
  return (dispatch) => {
    const intStudents = parseInt(numStudents);
    if (!isNaN(intStudents) && intStudents >= CONSTANTS.minStudents && intStudents <= CONSTANTS.maxStudents) {
      const payload = Object.assign({}, {
        numStudents: intStudents,
      }, createStudents(intStudents))

      dispatch({
        type: ACTION_TYPES.UPDATE_STUDENTS,
        payload
      });
    }
  }
}

export const updateSection = (section) => {
  return (dispatch) => {
    const intSection = parseInt(section);

    if (!isNaN(intSection) && intSection >= CONSTANTS.minSection && intSection <= CONSTANTS.maxSection) {
      let payload;

      // if current section's date is same as today's date, load that section
      if (lsUtils.isSectionCurrent(intSection)) {
        const oldState = lsUtils.loadSection(intSection);
        payload = {
          section: intSection,
          numStudents: oldState.numStudents,
          students: oldState.students,
          unpickedStudents: oldState.unpickedStudents
        }
      } else {
        payload = Object.assign({}, createStudents(CONSTANTS.defaultNumStudents), { section: intSection })
      }

      dispatch({
        type: ACTION_TYPES.UPDATE_SECTION,
        payload
      });
    }
  }
}

// helper function to speak out the ID
const speak = (studentId) => {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0];
  msg.text = "" + studentId;
  msg.lang = 'en-US';
  msg.volume = 1
  speechSynthesis.speak(msg);
};

// helper function to create arrays of students
export const createStudents = (numStudents) => {
  return {
    students: new Array(numStudents).fill().map((_, index) => ({
      id: index + 1,
      status: 'unpicked'
    })),
    unpickedStudents: new Array(numStudents).fill().map((_, index) => index + 1),
    numStudents
  }
}

export const saveList = () => {
  if (lsUtils.isLocalStorageAvailable()) {
    lsUtils.saveList()
  }
}
