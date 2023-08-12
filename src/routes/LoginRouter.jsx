import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Mainmenu from '../components/Mainmenu';




const LoginRouter= () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/menu"
          element={<Mainmenu/>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default LoginRouter
