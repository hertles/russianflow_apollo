import React from 'react';
import style from './SubmitButton.module.scss'

function SubmitButton(props) {
    const title = props.title || "Отправить"
    return (
        <button type="submit" className={style.button}>{title}</button>
    );
}

export default SubmitButton;
