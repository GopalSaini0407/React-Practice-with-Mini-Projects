import { useEffect, useState } from "react"
import axios from "axios";


export function FetchWithUseEffect(){
    const [post,setPost]=useState([]);
    const [loading,setLoading]=useState(true);
    const [searchText,setSearchText]=useState("");

    const [currentPage,setCurrentPage]=useState(1);   //start with page 1
     const postsPerPage=12;     // har page pr 12 post

    //   first method with promise
// const fetchData=()=>{
//     fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res=>res.json())
//     .then(data=>setPost(data))
//     .catch( err=>{
//         console.error("data fetch failed",err);
//     })
//     .finally(()=>{
//         setLoading(false)
//     });
// }

// second method with async/await

// const fetchData=async()=>{
//      try {

//     const response= await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log(response)
//     if(!response.ok)
//         {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }
//     const data=await response.json();
//     setPost(data);
        
//      } catch (error) {
//         console.error("data fetch faild:",error);
//      }
//      finally{
//         setLoading(false)
//      }
// }

const fetchData=()=>{
   axios.get('https://jsonplaceholder.typicode.com/posts')

                .then(res=>setPost(res.data))
    .catch(err=>{
        console.error("failed to fetch",err)
    }).finally(()=>{
        setLoading(false)
    })
}

     useEffect(()=>{
        
        fetchData();

     },[])

     if(loading){
        return <p className="text-green-500 text-center">Loading.......</p>
     }
    
     const searchFilter= post.filter(post=>
          post.title.toLowerCase().includes(searchText.trim().toLowerCase())
        )
     
    const indexOfLastPost=currentPage * postsPerPage;
    // page 1=>1*12=12 last index

    const indexOfFirstPosts=indexOfLastPost-postsPerPage;
                            // 12-12=0 first index
    const currentPosts=searchFilter.slice(indexOfFirstPosts,indexOfLastPost)
    // slice(0,12)=> post 0 to 11 dikhegi

    // total kitne page show honge
    const totalPages=Math.ceil(searchFilter.length/postsPerPage);
    // ager 100 post hai to 12 per pages=Math.ceil(8.33) //9

    // page no. buttons bante hai

    const pageNumbers=Array.from({length:totalPages},(_,i)=>i+1);
    // output:[1,2,3,...,10]

    // page no. click hone pr page badal do

    const handlePageClick=(num)=>{
        setCurrentPage(num);
    }

    console.log(indexOfLastPost);



    return (
        <div className="container mx-auto p-4 flex  items-center min-h-screen bg-gray-100 flex-col">
            <div className="inputbox mb-5">
                <input type="text"
                 placeholder="search title..."
                  className="p-3 rounded-lg outline-none border border-gray-300 shadow-sm w-80"
                  onChange={(e)=>setSearchText(e.target.value)}
                  />
            </div>
<div className="grid grid-cols-4 gap-3">
{       currentPosts.length>0 ?(
    currentPosts && currentPosts.map((post)=>(

        <div 
        key={post.id}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl 
        shadow-lg p-6 transition-transform hover:scale-105
        ">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-gray-600">
            {post.body}
          </p>
        </div>
        ))
): <h1 className="text-red-700">No Data Match.</h1>
       
     }

</div>

{/* Pagination Buttons */}
<div className="flex gap-2 flex-wrap justify-center my-5">
                {pageNumbers.map(num => (
                    <button
                        key={num}
                        onClick={() => handlePageClick(num)}
                        className={`px-4 py-2 rounded-md border ${
                            num === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                        }`}
                    >
                        {num}
                    </button>
                ))}
            </div>

      </div>
      
    )
}