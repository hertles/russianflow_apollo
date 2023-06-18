import React from 'react';
import style from './Button.module.scss'

function Button(props) {
    const title = props.title || "Отправить"
    return (
        <button type={props.type} className={style.button}>{title}</button>
    );
}

export default Button;
