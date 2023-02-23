import React, { useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let context = useContext(noteContext);
  // eslint-disable-next-line
  const { notes, getNotes,addNote ,editNote} = context;
  let navigate=useNavigate();

  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
  //Useref is basically used to give reference of something like we have given reference of close button to update
  //notes. and onclick update note button is calling clickhandle function. so we defined the ref over there on click which 
  //means whenever we click update notes our modal will close automatically as it is calling close utton over there.
  const ref = useRef(null);
  const closeref = useRef(null);
  useEffect(() => {
     if(localStorage.getItem('token')){
      getNotes();
     }
     else{
      navigate("/login");
     }
    
    // eslint-disable-next-line
  }, []);


  


  const updateNote = (currentNote) => {
    //to toggle our modal
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const handleClick=((e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    closeref.current.click();
    //updateNote(note);
     //addNote(e.title,e.description,e.tag );
     props.showAlert("Notes updated!!","success");
  })

  const onChange=((e)=>{
     setNote({...note,[e.target.name]:e.target.value});
  })

  return (
    <>
      <AddNotes showAlert={props.showAlert}/>

      {/* ------------------------------MODAL------------------------------------------- */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              {/* modal form to update the note */}
              <form className="mB-3">
                <div className="mY-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="btn btn-success "
                  onClick={handleClick}
                >
                  update Note
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeref}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
          {notes.length===0&&"No notes to display"}
        </div>
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        ))}
      </div>
    </>
  );
};
export default Notes;
