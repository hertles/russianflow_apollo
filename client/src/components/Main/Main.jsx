import React, {useEffect, useState} from 'react';
import style from './Main.module.css'
import {useQuery} from "@apollo/client";
import GET_ALL_ROUTES from "../../graphql/getAllRoutes.js";
import Card from "../common/Card/Card";
import Preloader from "../common/Preloader/Preloader";

const Main = (props) => {
    const [routes, setRoutes] = useState([])

    const {data, loading, error} = useQuery(GET_ALL_ROUTES)
    useEffect(() => {
        if (!loading){
            setRoutes(data.routes)

        }
    }, [loading])
    if (loading) {
        return <div className={style.Main}>
            <div className={`${style.Cards} ${style.loading}`}>
                <Preloader/>
            </div>
        </div>
    }

    return (
        <div className={style.Main}>
            <div className={style.Cards}>
                {routes?.map(route => {
                    return <Card key={route.id} item={route}/>
                })}
            </div>
        </div>
    );
}

export default Main;
