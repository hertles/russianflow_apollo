import React from 'react';
import style from './Card.module.scss'
import {Link} from "react-router-dom";
import classNames from "classnames";


function Item({item}) {
    const scrollHandler = (e) => {
        console.log(e)
    }
    return (
        <Link to={`/map/${item.id}/`}>
            <div onScroll={scrollHandler} className={style.Card}
                 style={{backgroundImage: `url(${item.image?.url})`}}>
                <div className={style.filter}/>
                <div className={classNames([style.name, style.info])}>{item.name}</div>
                <div className={style.info}>{item.desc}</div>
                {item.type && <div className={classNames([style.type, style.info])}>{item.type}</div>}
                <div className={style.cords}>
                    <div className={classNames([style.info])}>x: {item.x}</div>
                    <div className={classNames([style.info])}>y: {item.y}</div>
                </div>
            </div>
        </Link>
    );
}

export default Item;
