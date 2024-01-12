
import axios from "axios";
import { useState,useEffect } from "react";


const useFetchAxios = (dataUrl)=>{

  const[data,setData]=useState([]);
  const[fetchError,setFetchError]=useState(null);
  const[isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
                let isMounted = true;
                
                const source = axios.CancelToken.source();

                const fetchData =async(url)=>{

                    setIsLoading(true);
                    try {
                          const response =await axios.get(url,{cancelToken:source.token});
                          if(isMounted){
                            setData(response.data);
                            setFetchError(null);
                        }
                            
                    } catch (error) {
                          if(isMounted){
                            setFetchError(error.message);
                            setData([]);
                          }
                    }finally{
                        // isMounted && setTimeout(()=>setIsLoading(false),2000)
                        isMounted && setIsLoading(false)
                    }

                }
                fetchData(dataUrl);

                return ()=>{
                    // console.log("Clean up Function");
                    isMounted = false;
                    source.cancel();
                }

     
     
  },[dataUrl]);

  return {data,fetchError,isLoading}

}

export default useFetchAxios ;


