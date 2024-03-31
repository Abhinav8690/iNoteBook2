import React,{useState} from "react";
import NoteContext from "./NoteContext";
import Alert from "../../Components/Alert";


const NoteState = (props) => {
    const notesinitial=[
        
          
        
    ]
    const [notes, setNotes] = useState(notesinitial)
    
    // Get all Notes
    const GetallNotes =async () => {
        
        // Default options are marked with *
        const url="http://localhost:5000/api/notes/fetchallnotes"
        const response = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          
          
        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        setNotes(json);
       
      
    //TODO: API Call
   
    <Alert message="Note Added Successfully" type="success" />
    
    
}

    // Add a Note
    const addNote =async (title, description, tag) => {
        
            // Default options are marked with *
            const url="http://localhost:5000/api/notes/addnote"
            const response = await fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              
              headers: {
                "Content-Type": "application/json",
                "Auth-token": localStorage.getItem("token"),
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
             
              body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
            });
            const json= await response.json(); // parses JSON response into native JavaScript objects
            const note = { _id: json._id, title, description, tag }
            setNotes(notes.concat(note));
          
        //TODO: API Call
       
        <Alert message="Note Added Successfully" type="success" />
        
        
    }
    // Delete a Note
    const deleteNote = async(id) => {
        const url="http://localhost:5000/api/notes/deletenote/"+id
        const response = await fetch(url, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            "Auth-token": localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
         
         
        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        const newnotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newnotes);
        <Alert message="Note Deleted Successfully" type="success" />
    }
    // Edit a Note
    const editNote =async (id, title, description, tag) => {
        
            // Default options are marked with *
            const url="http://localhost:5000/api/notes/updatenote/"+id
            const response = await fetch(url, {
              method: "PUT", // *GET, POST, PUT, DELETE, etc.
              
              headers: {
                "Content-Type": "application/json",
                "Auth-token":localStorage.getItem("token"),
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
             
              body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
            });
            const json= await response.json(); // parses JSON response into native JavaScript objects
            console.log(json)
          
        let newnotes=JSON.parse(JSON.stringify(notes))
        for(let index=0;index<newnotes.length;index++){
            if(newnotes[index]._id===id){
                newnotes[index].title=title;
                newnotes[index].description=description;
                newnotes[index].tag=tag;
                break;
            }
        }
        setNotes(newnotes);
    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,GetallNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState