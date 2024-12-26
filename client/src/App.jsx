import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import { Provider } from "react-redux";
import store from "./store/store";
import Admin from "./pages/Admin/admin";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
