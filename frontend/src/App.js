import './App.css';
import Left from './Dashboard/Left';
import Right from './Dashboard/Right';
import Signup from './Components/SignUp';
import LogIn from './Components/LogIn';
import { useAuth } from './Context/AuthProvider';
import { Routes, Route, Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)
  return (
    <>
      <Routes>
        <Route path='/' element={
          authUser
            ?
            (<div className='flex flex-row'>
              <Left />
              <Right />
            </div>)
            :
            (<Navigate to='/login' />)
        } />
        <Route path='/login' element={<LogIn />} />
        <Route  path='/signup' element={<Signup />}/>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
