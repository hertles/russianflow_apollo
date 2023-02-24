import React from 'react';
import style from './Header.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../assets/logo.png'

function Header(props) {
    return (
        <div className={style.Header}>

            <div className={style.logoOuter}>
                <NavLink to="/">
                    <img className={style.logo} src={logo} alt=""/>
                </NavLink>
            </div>
            <div className={`${style.RussianFlow} ${style.HeaderButton}`}><div><NavLink to="/">RussianFlow</NavLink></div></div>
            <div className={style.HeaderButtonBlock}>
                <NavLink to="map"><div className={style.HeaderButton}>На большую карту</div></NavLink>
                <div className={style.HeaderButton}><div>Избранное</div></div>
                <div className={style.HeaderButton}><div>Профиль</div></div>
                <div className={style.HeaderButton}><div>Поиск</div></div>
            </div>
        </div>
    );
}

export default Header;