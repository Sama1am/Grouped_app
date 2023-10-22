import './App.css';
import { Route, Routes } from 'react-router';
import { React } from 'react';
import { socket } from './context/socketContext';
import 'bootstrap/dist/css/bootstrap.css';

//contexts
import { AdminProvider } from './context/adminContext';
import { PitchListProvider } from './context/pitchContext';

//pages
import Login from './pages/login/loginPage';
import Main from './pages/mainPage';
import Join from './pages/joinSessionPage';
import Create from './pages/createSessionPage';
import Dashboard from './pages/dashboardPages/dashboard';
import PrivateRoutes from './utils/privateRoutes';

function App() {
  socket.connect();

  return (
    <AdminProvider>
      <PitchListProvider>
          <Routes>
              <Route path="/" element={<Login />} />
                <Route path='/main' element={<PrivateRoutes />}>
                    <Route index element={<Main />} />
                    <Route path="join" element={<Join />} />
                    <Route path="create" element={<Create />} />
                </Route>
                <Route path='/dashboard' element={<PrivateRoutes />}>
                    <Route index element={<Dashboard />} />
                </Route>
          </Routes>
      </PitchListProvider>
  </AdminProvider>

  );
}

export default App;
