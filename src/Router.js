import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateEmploye from './pages/createEmploye';
import FormEmploye from './pages/formEmployee';

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<CreateEmploye/>}/>
                <Route path='/form' element={<FormEmploye/>}/>
            </Routes>
        </Router>
    )
}

export default AppRouter