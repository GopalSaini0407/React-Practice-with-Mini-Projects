import { useEffect, useState } from "react"

export function PaginationWithApi(){
     
    const [users,setUser]=useState([]);
    const [loading,setLoading]=useState(true);
    const [searchText,setSearchText]=useState("");
    const [searchField,setSearchField]=useState("name");

    const [currentPage,setCurrentPage]=useState(1)
    const NumberOfPost=4;

    useEffect(()=>{
           
        fetch('https://jsonplaceholder.typicode.com/users').
        then(res=>res.json()).
        then(data=>setUser(data)).
        catch(err=>console.error("failed to fetch",err)).
        finally(()=>setLoading(false))

    },[])

    useEffect(() => {
        setCurrentPage(1);
      }, [searchText]);
      


    if(loading){
        return <h1 className="text-green-400 text-center">Data is Loading...</h1>
    }

   
    const searchFilter=users.filter((user)=>{
      const query=searchText.trim().toLowerCase();

      if(searchField==="name"){
        return user.name.toLowerCase().includes(query);
      }else if(searchField==="phone"){
        return user.phone.toLowerCase().includes(query);
      }else if(searchField==="email"){
        return user.email.toLowerCase().includes(query);
      }
      return false;
    });

  
// step 1
    const indexOfLastUser=currentPage*NumberOfPost;
            //    5      =         1 *5   
            //  10   =          2*5
// step 2

    const indexOfFirstUser=indexOfLastUser-NumberOfPost;
                // 0        =     5        - 5
                // 5        =     10       - 5
// step 3

    const currentUsers=searchFilter.slice(indexOfFirstUser,indexOfLastUser);

// step 4
    const noOfLength=Math.ceil(searchFilter.length/NumberOfPost);

 // step 5
    const totalPage=Array.from({length:noOfLength},(_,i)=>i+1);

// step 6
    const pageNumber=(num)=>{
        setCurrentPage(num)
    }
   

    const GoToPrevPage=()=>{
         
      setCurrentPage((prev)=>Math.max(prev-1,1));
    }

    const GoToNextPage=()=>{
         
      setCurrentPage((prev)=>Math.min(prev+1,totalPage.length))
    }
   
    const handleDelete=(id)=>{
        const updateUser= users.filter( user=>user.id!==id);
        setUser(updateUser);
    }

    return(
        <div className="container mx-auto p-6">
            <div className="inputbox my-2">
                <input type="text" placeholder={`Search user by ${searchField}`} 
                 className="border outline-0 border-gray-200 p-2 rounded"
                 onChange={(e)=>setSearchText(e.target.value)}
                     
                 />
                 <select value={searchField}
                 onChange={(e)=>setSearchField(e.target.value)}
                 className="border p-2 rounded bg-white ms-3"

                 >
                  <option value="name">Search by Name</option>
                  <option value="phone">Search by Phone</option>
                  <option value="email">Search by Email</option>
                 </select>
            </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          { currentUsers.length>0 ? (
currentUsers?.map((user) => (
    <div key={user.id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition">
    
      <div className="flex justify-between">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">{user.name}</h2>

              {/* Delete button */}
      <button
        onClick={() => handleDelete(user.id)}
        className=" text-red-500 hover:text-red-700 min-w-[60px]"
        title="Delete User"
      >
        🗑️ delete
      </button>
      </div>
      <p className="text-gray-700"><strong>📞</strong> {user.phone}</p>
      <p className="text-gray-700"><strong>✉️</strong> {user.email}</p>


    </div>
  ))
          ): <h1> data not found </h1>
            
          }
        </div>
        <div className="flex justify-center mt-6">
  <div className="flex gap-2 flex-wrap bg-white p-4 rounded-lg shadow-md">
  <button
      onClick={GoToPrevPage}
      disabled={currentPage===1}
      className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-300 disabled:opacity-50"

  >prev</button>

    {totalPage?.map((pages) => (
      <button
        key={pages}
        onClick={() => pageNumber(pages)}
        className={`px-4 py-2 bg-blue-100 text-blue-700 rounded-md border border-blue-300 hover:bg-blue-600 hover:text-white transition duration-200
            ${pages===currentPage ? "bg-blue-600 text-white":""}
            `}
      >
        {pages}
      </button>
    ))}

    <button
    onClick={GoToNextPage}
    disabled={currentPage===totalPage.length}
    className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-300 disabled:opacity-50"
    >next</button>
  </div>
</div>

   
        
      </div>
      
    )
}