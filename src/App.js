import './App.css';
import Sidebar from './component/Sidebar/Sidebar';
import Box from '@mui/material/Box';
import { Routes, Route ,BrowserRouter } from "react-router-dom"
import Authorpanel from './Pages/Authors/Authorpanel';
import Categoraypanel from './Pages/Categoray/Categoraypanel';
import Postpanel from './Pages/Posts/Postpanel';
import Commentpanel from './Pages/Comments/Commentpanel';
import Accountpanel from './Pages/Accounts/Accountpanel';
import Accounts from './Pages/Accounts/Accounts';




 import Loginform from './Pages/login/Loginform';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Box sx={{ display: 'flex', marginTop: '64px', backgroundColor: '#FFF', paddingBottom: '64px' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <switch>
              <Routes>
                
                <Route path="author" element={ <Authorpanel/> } />
                <Route path="categoraypanel" element={ <Categoraypanel/> } />
                <Route path="commentpanel" element={ <Commentpanel/> } />
                <Route path="accountpanel" element={ <Accountpanel/> } />
                <Route path="postpanel" element={ <Postpanel/> } />
               
                <Route path="accounts" element={ <Accounts/> } />
               
              
                
                

                <Route path="Login" element={ <Loginform/> } />
              </Routes> 
            </switch>
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
