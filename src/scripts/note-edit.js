import { removeNote, updateNote, getNoteById } from "./notes-functions";
import { getLastTimeEditedMessage } from "./views";

const titleInput = document.querySelector("#edit-title-input");
const bodyTextarea = document.querySelector("#edit-body-textarea");
const noteId = location.hash.substring(1);

let note = getNoteById(noteId);

//Update element time
const updateTimeElement = () => {
  const lastUpdateTimeELement = document.querySelector("#last-updated");
  lastUpdateTimeELement.textContent = getLastTimeEditedMessage(note);
};

// Setup note data to input (title) and textarea (body)
const setNoteToInputs = (note) => {
  if (note) {
    titleInput.value = note.title;
    bodyTextarea.value = note.body;
    updateTimeElement();
  } else location.assign("/index.html");
};

// Will save title immidetelly when focus gone
titleInput.addEventListener("change", (e) => {
  updateNote(noteId, { title: e.target.value });
  updateTimeElement();
});

// Will save body immidetelly when focus gone
bodyTextarea.addEventListener("change", (e) => {
  updateNote(noteId, { body: e.target.value });
  updateTimeElement();
});

document.querySelector("#remove-note-button").addEventListener("click", () => {
  removeNote(noteId);
  location.assign("./index.html");
});

// Linsten to any changes in storage
window.addEventListener("storage", (e) => {
  if (e.key == "notes") {
    note = getNoteById(noteId);
    setNoteToInputs(note);
  }
});

setNoteToInputs(note);
