import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editTitle,editBody,setEditTitle,setEditBody}) => {

   const { id } = useParams();

   const post = posts.find((post) => (post.id).toString() === id)

   useEffect(()=>{
      
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body); 
    }
       },[post, setEditTitle, setEditBody])
    
   return (
    <main className='NewPost'> 
    { 
     editTitle &&
     <>
        <h1>EditPost</h1>
    <form  className="newPostForm"
     onSubmit = {(e)=>e.preventDefault()} 
     >
     <label htmlFor="editTitle">Title:</label>
     <input
       id="editTitle"
       type="text"
       required
       value={editTitle}
       onChange={(e)=>setEditTitle(e.target.value)}
     />
      
      <label htmlFor="editBody">Post:</label>
      <textarea 
      id="editBody"
      required
      value ={editBody}
      onChange={(e)=>setEditBody(e.target.value)}
      ></textarea>

      <button
       type="submit"
        onClick={()=>handleEdit(post.id)}
      >Submit</button>
     </form>
   </>
   }
    {
    !editTitle &&
        <>
        <h2>Post not found.</h2>

        <p>Well,that's disappointing.Akash</p>
       
       <p>
           <Link to="/">Visit Our HomePage</Link>
         </p>       
    </>
    
    }
    </main>
  )
}

export default EditPost