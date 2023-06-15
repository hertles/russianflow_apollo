import React from 'react';
import style from './RouteDescription.module.css'

const RouteDescription = ({route}) => {
    if (route) {
        return (
            <div className={style.RouteDescription}>
                <div className={style.Name}>{route.name}</div>
                <div><img className={style.image} src={route.photo_url} alt="Фото маршрута"/></div>
                <div><strong>Тип маршрута: </strong>{route.type}</div>
                <div><strong>Описание: </strong>{route.desc}</div>
                <div><strong>x: </strong>{route.x}</div>
                <div><strong>y: </strong>{route.y}</div>
            </div>
        );
    } else {
        return (
            <div className={"toCenter"}>Маршрут не выбран</div>
        );
    }
}

export default RouteDescription;
