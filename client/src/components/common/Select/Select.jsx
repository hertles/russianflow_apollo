import style from './Select.module.scss'

export const Select = ({placeholder, value, checked, name, onChange, options, ...restInput}) => {
    return (
        <select
            {...restInput}
            autoComplete={"off"}
            className={style.input}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
        >
            {Object.keys(options).map(option=>(
                <option key={option} value={option}>
                    {option}
                </option>))}
        </select>)
}
