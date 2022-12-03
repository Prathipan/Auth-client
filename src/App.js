import Login from "./components/Login";
import Register from "./components/Register";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom";
import Portal from "./components/Portal";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

function App() {
	
	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/user" element={<Portal />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:id/:token" element={<PasswordReset />} />
			</Routes>
		</div>
		
	);
}

export default App;
