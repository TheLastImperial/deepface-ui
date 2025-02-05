import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { VerifyForm } from "./pages/VerifyForm";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element ={<Navigate to="/verify"/>} index/>
                <Route path="/" element={<Main/>}>
                    <Route path="verify" element={<VerifyForm/>} index/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
