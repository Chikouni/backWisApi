const noteController = require("../controllers/api/noteController");

const basePath = "/api/v1/notes";
const pathWithId = basePath + "/{id}";

module.exports = [
  {
    method: "POST",
    path: basePath,
    options: noteController.noteValidationAndAuth,
    handler: noteController.addNote,
  },
  {
    method: "GET",
    path: basePath,
    handler: noteController.getNotes,
    options: noteController.noteAuth
  },  
  {
    method: "GET",
    path: pathWithId,
    handler: noteController.getNote,
    options: noteController.noteAuth
  },
  {
    method: "PUT",
    path: pathWithId,
    options: noteController.noteValidationAndAuth,
    handler: noteController.updateNote,
  },
  {
    method: "DELETE",
    path: pathWithId,
    handler: noteController.deleteNote,
    options: noteController.noteAuth
  },
];
