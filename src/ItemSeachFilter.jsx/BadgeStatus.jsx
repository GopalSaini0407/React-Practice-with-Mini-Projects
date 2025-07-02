
export function BadgeStatus({status}){
    return(
        <>
        <div
        className={`ms-5 ${status==="active" ? "bg-green-600 h-3 w-3 rounded-full" : "bg-red-600 h-3 w-3 rounded-full"}`}
        ></div>
        </>
    )
}