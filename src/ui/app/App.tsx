import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import {Form} from "../pages/form/Form";
import {Palitra} from "../pages/palitra/Palitra";
import {CircularProgress} from '../common/circular-progress/CircularProgress';
import {Header} from "../common/header/Header";
import {useAppSelector} from "../../utils/hooks";

export const PATH = {
    FORM: '/form',
    PALITRA: '/palitra',
}

function App() {
    const status = useAppSelector(state => state.app.status)
    return (
        <div className="App">
            <div className="wrapper">
                {status === 'loading' && <CircularProgress/>}
                <div className="container">
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={PATH.FORM}/>}/>
                        <Route path={PATH.FORM} element={<Form/>}/>
                        <Route path={PATH.PALITRA} element={<Palitra/>}/>
                        <Route path={'/*'} element={<h1>Error 404</h1>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
