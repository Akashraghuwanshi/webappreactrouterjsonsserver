import Layout  from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import {Route , Routes, useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {format} from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';

import useFetchAxios from './hooks/useFetchAxios';



function App() {
  const[posts,setPosts]=useState([]);

  const[search,setSearch]=useState('');
  
  
  const[searchResults,setSearchResults]= useState([]);

  const navigate = useNavigate();

  const[postTitle,setPostTitle]= useState('');
   
  const[postBody,setPostBody]= useState('');

  const[editTitle,setEditTitle] = useState('');
   
  const [editBody, setEditBody] = useState('');

   const {data,fetchError,isLoading} = useFetchAxios("http://localhost:3500/posts")
  
    useEffect(()=>{
        setPosts(data);
    },[data])

    /* the below useEffect become redundant becoz i am using custom hook useFetchAxios */
  /* useEffect(() => {
       const fetchPosts = async () => {
        try {
          const response = await api.get('/posts')
          setPosts(response.data);
        } 
          catch (error) {
          if(error.response){
             //if response is not in the 200 range
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
             } 
          else{
              console.log(`Error:${error.message}`);
              }
        }

       }
         fetchPosts();
    },[] ) */

  useEffect( ()=>{
    const filteredResults = posts.filter((post)=>(
      ((post.body)?.toLowerCase() || '').includes(search.toLowerCase()) ||

      ((post.title)?.toLowerCase() || '').includes(search.toLowerCase())
    ))
    
    setSearchResults(filteredResults.reverse())

  },[posts , search])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const id = posts.length ? (posts[posts.length-1].id) + 1: 1;

    const datetime =format (new Date(),'MMMM dd, yyyy pp');

    const newPost ={ id ,title:postTitle,datetime, body:postBody}
    try{
       
      const response = await api.post('/posts' ,newPost)
       
      const allPosts = [...posts , response.data];
       setPosts(allPosts);
     setPostTitle('');
     setPostBody('');
     navigate('/')
    
    } catch(error){
      console.log(`Error:${error.message}`);
    }
  }

  const handleEdit = async(id)=>{
    
    const datetime =format (new Date(),'MMMM dd, yyyy pp');
    const updatedPost ={ id ,title:editTitle,datetime, body:editBody}
    try{

      const response = await api.put(`/posts/${id}`,updatedPost);
      // console.log(response.data);
      setPosts(posts.map(post=>(post.id === id?{...response.data}:post)));
      setEditTitle('');
      setEditBody(''); 
      navigate('/');
    }catch(error){
      console.log(`Error:${error.message}`);
    }

  }



    

  const handleDelete = async(id)=>{
    try{

      await api.delete(`/posts/${id}`);
      // const response = await api.delete(`/posts/${id}`);
      // console.log( response);
      const postList = posts.filter(post=>post.id !== id);
      setPosts(postList);
      navigate('/');
    }catch(error){
      console.log(`Error:${error.message}`);
    }
  }


  return ( 
    <Routes>

       <Route path="/"  element={<Layout
         search={search}
         setSearch={setSearch}
       />} >
          {/* by deafault path of parent path / of element layout */}
          
      <Route  index element={<Home 
       posts={searchResults} 
       fetchError={fetchError} 
       isLoading={isLoading}
       />} 
       />

      <Route path = "post" >
              {/* by default path of parent path post */}
              <Route index element ={<NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              />}/>

             
              {/* Relative path */}  
        
            <Route  path = "/post/:id" 
                   element={ <PostPage
               posts ={posts}
               handleDelete={handleDelete}
               />} 
            />
            
       </Route>
       {/* Absolute path  */}
       <Route path ="edit/:id" element ={<EditPost
                          posts={posts}
                          handleEdit={handleEdit}
                          editTitle={editTitle}
                          setEditTitle={setEditTitle}
                          editBody={editBody}
                          setEditBody={setEditBody}
                     />}
              />
        <Route path="about" element={<About/>} />
      
         <Route path="*" element={<Missing/>} />

         </Route>
         
    </Routes>
      
  );
}

export default App;
