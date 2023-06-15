import style from './Input.module.scss'
export const Input = ({ placeholder, value, checked, name, onChange, ...restInput }) => {
    return <input
        {...restInput}
        autoComplete={"off"}
        className={style.input}
        value={value}
        type="text"
        name={name}
        onChange={onChange}
        placeholder={placeholder}/>
}
