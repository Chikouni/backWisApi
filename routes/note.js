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
    options: noteController.noteAuth("realm:USER")
  },  
  {
    method: "GET",
    path: pathWithId,
    handler: noteController.getNote,
    options: noteController.noteAuth.noteAuth("realm:USER")
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
    options: noteController.noteAuth.noteAuth("realm:USER")
  },
];
