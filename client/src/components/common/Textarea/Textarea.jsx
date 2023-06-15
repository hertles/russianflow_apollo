import style from './Textarea.module.scss'
export const Textarea = ({ placeholder, value, checked, name, onChange, ...restInput }) => {
    return <textarea
        {...restInput}
        autoComplete={"off"}
        className={style.textarea}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
    rows={6}/>
}
