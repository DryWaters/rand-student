import CONSTANTS from './constants';

export const isLocalStorageAvailable = () => {
  if (typeof localStorage === 'undefined') {
    alert('A browser with localstorage is required to use sections')
    return false;
  }
  return true;
}

export const isSectionCurrent = (section) => {
  const currentDay = new Date().getDate();

  if (localStorage.getItem(section) === null || JSON.parse(localStorage.getItem(section)).day === null) {
    return false;
  } else {
    const sectionDay = parseInt(JSON.parse(localStorage.getItem(section)).day);
    return currentDay === sectionDay;
  }
}

export const loadSection = (section) => {
  return JSON.parse(localStorage.getItem(section));
}

export const saveSection = (state) => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(state.section, JSON.stringify({ ...state, day: new Date().getDate() }));
  }
}

export const saveList = () => {
  var a = document.createElement("a");
  var file = new Blob([createList()], { type: "text/csv" });
  a.href = URL.createObjectURL(file);
  a.download = "students.csv";
  a.click();
  a = null;
}

const createList = () => {
  let output = `section,date,studentId\n`;
  for (let i = CONSTANTS.minSection; i <= CONSTANTS.maxSection; i++) {
    if (isSectionCurrent(i)) {
      output += parseSection(i);
    }
  }
  return output;
}

const parseSection = (section) => {
  const { students } = loadSection(section);
  return students.filter(student => student.status === 'picked').map(student => `${section}, ${new Date().toLocaleDateString()}, ${student.id}\n`).join('');
}