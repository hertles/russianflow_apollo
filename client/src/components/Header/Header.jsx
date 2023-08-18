import React, {useEffect, useState} from 'react';
import style from './Header.module.scss'
import {Link, NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.png'
import burger_button from '../../assets/images/burger_menu.png'

function Header() {

    const [online, setOnline] = useState(navigator.onLine)

    useEffect(() => {
        setInterval(() => {
            setOnline(navigator.onLine)
        }, 5000)
    }, [])

    const [downlink, setDownlink] = useState(navigator.connection.downlink)

    useEffect(() => {
        setInterval(() => {
            setDownlink(navigator.connection.downlink)
        }, 5000)
    }, [])

    return (
        <div className={style.Header}>
            <div className={style.mainButtons}>
                <div className={style.logoOuter}>
                    <Link to="/">
                        <img className={style.logo} src={logo} alt=""/>
                    </Link>
                </div>
                <NavLink to="/">
                    <div className={`${style.RussianFlow} ${style.HeaderButton}`}>
                        RussianFlow
                    </div>
                </NavLink>
            </div>

            {!online &&
                <div className={style.networkStatus}>
                    Внимание! Приложение находится в автономном режиме!
                </div>
            }

            {online && downlink < 1 &&
                <div className={style.networkStatus}>
                    Внимание! Низкая скорость соединения!
                </div>
            }


            <input className={style.inputBurger} id="inputBurger" type="checkbox"/><label htmlFor="inputBurger"
                                                                                          id="Burger"
                                                                                          className={style.Burger}><img
            src={burger_button} alt="open_menu"/></label>
            <div className={style.HeaderButtonBlock}>
                <NavLink to="map">
                    <div className={style.HeaderButton}>На большую карту</div>
                </NavLink>
                <div className={style.HeaderButton}>
                    <div>Скачанные маршруты</div>
                </div>
                <div className={style.HeaderButton}>
                    <div>Мой профиль</div>
                </div>
                <div className={style.HeaderButton}>
                    <div>Поиск</div>
                </div>
            </div>

        </div>
    );
}

export default Header;
