import { useState } from "react";
import { BadgeStatus } from "./BadgeStatus";

export function DeleteUser(){

    const data=[
        {username:"ram", statusbar:"active"},
        {username:"shyam", statusbar:"inactive"},
        {username:"monu", statusbar:"active"},
        {username:"jatin", statusbar:"active"},
        {username:"jay", statusbar:"inactive"}

    ]

    const [searchText,setSearchText]=useState("")
    const [users,setUser]=useState(data)

    const filterUser=users.filter( user=>
          user.username.toLowerCase().includes(searchText.trim().toLowerCase())
    )

    const DeleteHandler=(userToDelete)=>{
     
      const updateUser=users.filter( user=>
         user.username!==userToDelete
      );
      setUser(updateUser);
        
    }

    return(<>
    
    <div className="flex justify-center items-center h-[100vh] flex-col gap-2">
        <div className="input-box w-100">
            <input type="text" 
            placeholder="search username ..."
             className="p-2  outline-0 border border-gray-400 rounded" 
             onChange={(e)=>setSearchText(e.target.value)}
             
             />
        </div>
        <div className="userlist w-[100%] flex justify-center">
            <table className="border w-100">
                <thead>
                <tr className="border">
                            <th className="border">UserName</th>
                            <th className="border">Status</th>
                            <th className="border">Action</th>
                        </tr>
                </thead>
                <tbody>

                {
                    filterUser.map((data,ind)=>(
                        <tr className="border text-center" key={ind}>
                            <td className="border">  {data.username.charAt(0).toUpperCase()+data.username.slice(1)}                            </td>
                            <td className="border"><BadgeStatus status={data.statusbar}/></td>
                            <td>
                                <button 
                                className="px-4 py-1 m-1 bg-red-500 text-white"
                                onClick={()=>DeleteHandler(data.username)}
                                >delete</button>
                            </td>
                        </tr>
                       
                    ))
                }
             </tbody>

            </table>
          
        </div>
    </div>
    
    </>)
}