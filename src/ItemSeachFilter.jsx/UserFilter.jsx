import { useState } from "react";
import { BadgeStatus } from "./BadgeStatus";

export function UserFilter(){

    const [searchText,setSearchText]=useState("")
    const users=[
        {username:"ram", statusbar:"active"},
        {username:"shyam", statusbar:"inactive"},
        {username:"monu", statusbar:"active"},
        {username:"jatin", statusbar:"active"},
        {username:"jay", statusbar:"inactive"}

    ]

    const filterUser=users.filter( user=>
          user.username.toLowerCase().includes(searchText.trim().toLowerCase())
    )
    console.log(filterUser);

    return(<>
    
    <div className="flex justify-center items-center h-[100vh] flex-col gap-2">
        <div className="input-box w-100">
            <input type="text" 
            placeholder="search username ..."
             className="p-2  outline-0 border border-gray-400 rounded" 
             onChange={(e)=>setSearchText(e.target.value)}
             
             />
        </div>
        <div className="userlist w-100">
            <ul>
                {
                    filterUser.length>0 ? (
                        filterUser.map((user,ind)=>(
                            <li key={ind} className="flex gap-2 items-center mb-1">
                                <BadgeStatus status={user.statusbar}/>
                                {user.username}
                            </li>
                        ))

                    ):<li>No user found</li>
                }
            </ul>
        </div>
    </div>
    
    </>)
}