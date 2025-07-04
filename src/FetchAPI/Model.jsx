import { useState } from "react"

export const Model=({isOpen,onClose,children, size="w-[90%], min-h-[200px]"})=>{

    if(!isOpen) return null;

    return(
     <div className="bg-black/60 bg-opacity-50 fixed inset-0 flex justify-center items-center">
    <div className={`bg-white p-6 rounded shadow-md ${size} `}>
        {children}
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={onClose}>close</button>
    </div>
</div>
        
    )
}