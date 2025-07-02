import SidebarMenu from './SidebarMenu';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function Dashboard(){
  return <h2>Dashboard page</h2>;
}

function User(){
  return <h2>users page</h2>;
}

function Settings(){
  return <h2>Settings page</h2>;
}

function SidebarRouter(){
  return(<>
  <Router>
    <div className="flex">
    <SidebarMenu/>

      <div className="flex-1 p-4">
      <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/user" element={<User/>}/>
    <Route path="/settings" element={<Settings/>}/>
  </Routes>

      </div>
    </div>
    {/* sidebar */}
  

  </Router>
  </>)
}
export default SidebarRouter;