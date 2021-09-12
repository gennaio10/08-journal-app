import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(note));
  };

  const handlePicture = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>
      <input
        id="fileSelector"
        type="file"
        name=""
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button id="btnimage" className="btn" onClick={handlePicture}>
          Picture
        </button>
        <button id="btnsavenote" className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
