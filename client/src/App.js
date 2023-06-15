import './assets/css/main.scss';
import React from "react";
import Header from "./components/Header/Header";
import {Routes, Route} from 'react-router-dom'
import Main from "./components/Main/Main";
import 'leaflet/dist/leaflet.css';
import BigMap from "./components/BigMap/BigMap";
import RouteMap from "./components/RouteMap/RouteMap";

function App() {

    return (
        <div className="App">
            <Header/>
            <div className="MainGrid">
                <div className="Content">
                    <Routes>
                        <Route exact path={'/'} element={<Main/>}/>
                        <Route exact path={'/map'} element={<BigMap/>}/>
                        <Route exact path={'/map/:id/'} element={<RouteMap/>}/>
                    </Routes>
                </div>
            </div>

            {/*<div className="Grid">

                <div className="PointList">
                    {points.map(point =>
                        <NavLink to={"/point/" + point.id}>
                            <div key={point.id} className="Main">
                                <div className="PointData">{point.id}</div>
                                <div className="PointData">{point.name}</div>
                                <div className="PointData">Река: {point.river}<br/>Тип: {point.type}</div>
                            </div>
                        </NavLink>
                    )}
                </div>
                <div className="PointDescription"><Routes>
                    <Route path='/point/:id' element={<Main/>}/>
                </Routes></div>
            </div>*/}
        </div>
    );
}

export default App;
