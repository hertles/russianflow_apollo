import React from 'react';
import style from './Header.module.scss'
import {Link, NavLink} from "react-router-dom";
import logo from '../../assets/logo.png'
import burger_button from '../../assets/burger_menu.png'
function Header(props) {
    return (
        <div className={style.Header}>
            <div className={style.mainButtons}>
                <div className={style.logoOuter}>
                    <Link to="/">
                        <img className={style.logo} src={logo} alt=""/>
                    </Link>
                </div>
                <div className={`${style.RussianFlow} ${style.HeaderButton}`}>
                    <NavLink to="/">
                        RussianFlow
                    </NavLink>
                </div>
            </div>


            <input className={style.inputBurger} id="inputBurger" type="checkbox"/><label htmlFor="inputBurger"
                                                            id="Burger" className={style.Burger}><img
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
