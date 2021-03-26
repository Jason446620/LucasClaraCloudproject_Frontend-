import React, { InputHTMLAttributes } from 'react';
import './style.css';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    namePlaceHolder: string;
    cssType: string;
}

const InputSearch: React.FC<InputSearchProps> = ({ cssType, namePlaceHolder, ...rest }) => {
    return (
        <div>
            <input className={cssType} type='text' placeholder={namePlaceHolder} {...rest}/>
        </div>
    );
}

export default InputSearch;