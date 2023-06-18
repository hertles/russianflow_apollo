import React  from 'react';
import style from './Card.module.css'
import {Link} from "react-router-dom";


function Item({item}) {
    return (
        <Link to={`/map/${item.id}/`}><div className={style.innerPoint}><img className={style.image} src={item.image?.url}/>
            <div className={style.name}>{item.name}</div>
            <div className={style.desc}>{item.desc}</div>
            <div className={style.type}>{item.type}</div>
            <div className={style.cord}>x: {item.x}</div>
            <div className={style.cord}>y: {item.y}</div>
        </div></Link>
    );
}

export default Item;
