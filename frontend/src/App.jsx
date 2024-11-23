import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

import 'react-toastify/ReactToastify.css'

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App;
