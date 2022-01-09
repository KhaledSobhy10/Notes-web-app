import { v4 as uuidv4 } from "uuid";

// Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

const notes = loadNotes();

//Get saved notes
const getSavedNotes = () => notes;

//Get note by id
const getNoteById = (noteId) => {
  return notes.find((note) => note.id === noteId);
};

// Save the notes to localStorage
const saveNotes = function () {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

//add note
const addNote = () => {
  const id = uuidv4();
  const timestamp = new Date().getTime();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes();
  return id;
};

//update note by id
const updateNote = (id, update) => {
  const note = notes.find((note) => note.id === id);
  if (!note) return; //check if note exist
  if (typeof update.title === "string") {
    note.title = update.title;
  } else if (typeof update.body === "string") {
    note.body = update.body;
  }
  note.updatedAt = new Date().getTime();
  saveNotes();
};

export { getSavedNotes, getNoteById, removeNote, updateNote, addNote };
