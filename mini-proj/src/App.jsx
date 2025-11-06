import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UseAuth } from './Hooks/UseAuth';
import Navbar from './Component/Navbar';
import UserHome from './Component/UserHome';
import UserLogin from './Component/Userlogin';
import UserSignup from './Component/UserSignup';
import CreateTab from './Component/CreateTab';
import UserData from './Component/UserData';
import AvailableSlots from './Component/AvailableSlots';
import Requests from './Component/Requests';

function App() {
  const { User } = UseAuth();

  return (
    <BrowserRouter>
    
      {User && <Navbar />}

      <Routes>
       
        <Route
          path="/"
          element={User ? <UserData /> : <Navigate to="/user/login" />}
        />

       
        <Route
          path="/home"
          element={User ? <UserHome /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/data"
          element={User ? <UserData /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/swapable-data"
          element={User ? <AvailableSlots /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/requests"
          element={User ? <Requests /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/create"
          element={User ? <CreateTab /> : <Navigate to="/user/login" />}
        />

        <Route
          path="/user/login"
          element={!User ? <UserLogin /> : <Navigate to="/" />}
        />
        <Route
          path="/user/signup"
          element={!User ? <UserSignup /> : <Navigate to="/" />}
        />

      
        <Route
          path="*"
          element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
