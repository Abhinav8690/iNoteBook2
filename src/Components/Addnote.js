import React,{useContext,useState} from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const Addnote = () => {
    const Context=useContext(NoteContext)
  const {addNote}=Context
  const [note,setNote]=useState({title:"",description:"",tag:""})
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleclick=(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
  }
  return (
    <div>
      <h1>Home Page</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" minLength={5} required aria-describedby="emailHelp" onChange={onChange} />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" minLength={5}  required name='description' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
        </div>
        <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
      
    </div>
  )
}

export default Addnote
