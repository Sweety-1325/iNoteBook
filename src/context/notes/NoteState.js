//import { stringify } from "querystring";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);


  //----------------------get all notes-------------------------------
  const getNotes = async() => {
    
    //API Calls
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        
      }
    );
    //const json=response.json();

    const json=await response.json();
   
    setNotes(json);
  };


  //----------------------------------add a note---------------------------------


  const addNote = async(title, description, tag) => {
    
    //API Calls
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      }
    );
    const json=await response.json();
  

    const note =json;
    setNotes(notes.concat(note));
    props.showAlert("Notes Added!!","success");
  };




  //----------------------Delete a note----------------------------------

  const deleteNote = async(id) => {
    
    //API CALLS
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        
      }
    );
    //const json=response.json();

    const json=await response.json();
    setNotes(json);
    


    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
    
  };


  //-----------------------------Edit a note----------------------------------------------
  
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),

      }
    );
    const json=await response.json();
    setNotes(json);
    
    

    
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
      
    }
    let newNote=JSON.parse(JSON.stringify(notes))
    setNotes(newNote);
    //getNotes();
     
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
