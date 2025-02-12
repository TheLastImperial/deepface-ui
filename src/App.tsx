import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { AnalizeForm, RepresentForm, VerifyForm } from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element ={<Navigate to="/verify"/>} index/>
                <Route path="/" element={<Main/>}>
                    <Route path="verify" element={<VerifyForm/>} index/>
                    <Route path="analize" element={ <AnalizeForm/> }/>
                    <Route path="represent" element={ <RepresentForm /> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
