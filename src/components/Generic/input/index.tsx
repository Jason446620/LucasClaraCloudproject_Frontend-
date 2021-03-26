import React, {InputHTMLAttributes, useCallback} from 'react';
import NumberFormat from 'react-number-format';

//import style
import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    namePlaceholder:any;
    MaxLengh:any;
    MinLengh:any;
}

const StandardInput:React.FC<InputProps> = ({MaxLengh, MinLengh ,namePlaceholder, ...rest}) =>{
    
    const handleCnpj = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.maxLength = 18;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
        e.currentTarget.value = value;
    }, [])

    return(
        <div>
            <input className='standardInput' type='text' minLength={MinLengh} maxLength={MaxLengh} placeholder={namePlaceholder} onKeyUp={namePlaceholder === 'CNPJ'? handleCnpj : undefined} {...rest}/>
        </div>
    )
}

export default StandardInput;