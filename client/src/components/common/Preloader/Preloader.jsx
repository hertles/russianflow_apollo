import spinner from '../../../assets/images/spinner.gif'
import style from './Preloader.module.scss'
import React from "react";
let Preloader=(props)=>{
    return <img className={style.spinner} src={spinner}/>
}
export default Preloader
