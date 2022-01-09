import { getSavedNotes } from "./notes-functions";

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

const getFilters = () => filters;

const updateFilter = (update) => {
  if (typeof update.searchText === "string") {
    filters.searchText = update.searchText;
  }
  if (typeof update.sortBy === "string") {
    filters.sortBy = update.sortBy;
  }
};

// Sort notes by given sort type
const sortNotesBy = () => {
  let notes = getSavedNotes();
  if (filters.sortBy == "byCreated") {
    notes = notes.sort((note1, note2) => {
      if (note1.createdAt < note2.createdAt) return 1;
      else if (note1.createdAt > note2.createdAt) return -1;
      else return 0;
    });
  } else if (filters.sortBy == "alphabetical") {
    notes = notes.sort((note1, note2) => {
      if (note1.title.toLowerCase() > note2.title.toLowerCase()) return 1;
      else if (note1.title.toLowerCase() < note2.title.toLowerCase()) return -1;
      else return 0;
    });
  } else {
    notes = notes.sort((note1, note2) => {
      if (note1.updatedAt < note2.updatedAt) return 1;
      else if (note1.updatedAt > note2.updatedAt) return -1;
      else return 0;
    });
  }
  return notes;
};

// Filter notes by text
const filterNotesByText = (notes) => {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
};

const getFilteredNotes = () => {
  return filterNotesByText(sortNotesBy());
};

export { getFilters, updateFilter, getFilteredNotes };
