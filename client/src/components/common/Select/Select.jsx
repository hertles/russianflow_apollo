import style from './Select.module.scss'

export const Select = ({placeholder, value, checked, name, onChange, options, viewOption, ...restInput}) => {

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
            {options.map(option=> {
                return (
                    <option key={option} value={option}>
                        {option}
                    </option>)
            })}
        </select>)
}
