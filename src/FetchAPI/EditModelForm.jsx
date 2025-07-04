import { useEffect,useState } from "react";

export const EditUserForm=({userData,onClose,onSave})=>{
   
    const [user,setUser]=useState(userData);

       useEffect(()=>{
        setUser(userData); // update form if userData changes
    },[userData]);

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSumbit=()=>{
        onSave(user);
        onClose();
    }

    return(
        <div>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <input name="name" 
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 mb-2 border rounded"
            />
            <input name="phone" 
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 mb-2 border rounded"
            />
            <input name="email" 
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 mb-2 border rounded"
            />
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSumbit}

            >
                Save Changes
            </button>

        </div>
    )
}