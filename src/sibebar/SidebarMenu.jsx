import React from 'react'
import { useLocation,Link } from "react-router-dom";

function SidebarMenu() {
  const location = useLocation();
  const currentPath = location.pathname;
  const menuItem=[
    {label:'Dashboard',path:"/"},
    {label:'User',path:"/user"},
    {label:'Settings', path:"/settings"},
  ];

  return (
    <div className="sidebar bg-blue-500 text-white h-[100vh] w-[250px]">
      <nav>
        <ul>
          {
     menuItem.map((menu)=>{
     return <li key={menu.path}>
            <Link
              to={menu.path}
              className={`block px-4 py-2 transition-colors duration-300 ${currentPath===menu.path ? "bg-yellow-400 text-black font-semibold":""}`}
            >
              {menu.label}
            </Link>
          </li>
     })
          }
          
        </ul>
      </nav>
    </div>
  )
}

export default SidebarMenu
