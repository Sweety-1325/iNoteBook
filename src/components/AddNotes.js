import React from "react";
import { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNotes = (props) => {
  let context = useContext(noteContext);
  // eslint-disable-next-line
  let { addNote} = context;
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const handleClick=((e)=>{
    e.preventDefault();
     addNote(note.title,note.description,note.tag );
     setNote({title:"",description:"",tag:""})
     props.showAlert("Notes Added!!","success");
  })
  const onChange=((e)=>{
     setNote({...note,[e.target.name]:e.target.value});
  })
  return (
    <div>
      <div className="container my-3">
        <h2>Enter your Notes</h2>
        <form className="mB-3">
          <div className="mY-3">
            <label htmlFor="title" className="form-label" >
              Title
            </label>
            <input
            value={note.title}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >
              Description
            </label>
            <input
            value={note.description}
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >
              Tag
            </label>
            <input
              value={note.tag}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          
          <button disabled={note.description.length<5} type="submit" className="btn btn-success " onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
