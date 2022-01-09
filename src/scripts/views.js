import { filterNotes, getFilteredNotes } from "./filters";

const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
  const noteEl = document.createElement("a");
  const titleEl = document.createElement("p");
  const statusEl = document.createElement("p");

  //Setup  style to note elements
  noteEl.className = "list-item";
  titleEl.className = "list-item__title";
  statusEl.className = "list-item__subtitle";

  // Setup the note title text
  titleEl.textContent = note.title.length > 0 ? note.title : "Unnamed note";
  noteEl.setAttribute("href", `./edit.html#${note.id}`);
  noteEl.appendChild(titleEl);

  //Setip the note status
  statusEl.textContent = getLastTimeEditedMessage(note);
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const notesElement = document.getElementById("notes");
  notesElement.innerHTML = "";

  const notes = getFilteredNotes();

  notes && notes.length > 0
    ? appendNotesElements(notes, notesElement)
    : appendEmptyMessageElement(notesElement);
};

// append given notes elements to element
const appendNotesElements = (filteredNotes, parentELement) => {
  filteredNotes.forEach((note) => {
    const noteEl = generateNoteDOM(note);
    parentELement.appendChild(noteEl);
  });
};

const appendEmptyMessageElement = (parentELement) => {
  const emptyELement = document.createElement("p");
  emptyELement.textContent = "No notes found !!";
  emptyELement.className = "empty-message";
  parentELement.appendChild(emptyELement);
};



const getLastTimeEditedMessage = (note) =>
  "Last edit " + dayjs(note.updatedAt).fromNow();

export { renderNotes, getLastTimeEditedMessage };
