import { updateFilter } from "./filters";
import { addNote } from "./notes-functions";
import { renderNotes } from "./views";

renderNotes();

document.querySelector("#create-note").addEventListener("click", function (e) {
  const id = addNote();
  location.assign(`./edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", function (e) {
  updateFilter({ searchText: e.target.value });
  renderNotes();
});

document.querySelector("#filter-by").addEventListener("change", function (e) {
  updateFilter({ sortBy: e.target.value });
  renderNotes();
});

// Linsten to any changes in storage
window.addEventListener("storage", (e) => {
  if (e.key == "notes") {
    notes = JSON.parse(e.newValue) || [];
    renderNotes();
  }
});
