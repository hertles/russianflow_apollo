import React from 'react';
import style from "./Button.module.scss"
import classNames from "classnames";

function Button({title,disabled,type, onClick}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={classNames([style.button,{[style.disabled]: disabled}])}>
            {title || 'Отправить'}
        </button>
    );
}

export default Button;
