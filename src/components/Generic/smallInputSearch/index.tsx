import React, { InputHTMLAttributes } from 'react';
import './style.css';

interface SmallInputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    namePlaceHolder: string;
    cssType: string;
}

const SmallInputSearch: React.FC<SmallInputSearchProps> = ({ cssType, namePlaceHolder, ...rest }) => {
    return (
        <div>
            <input className={cssType} type='text' placeholder={namePlaceHolder} {...rest}/>
        </div>
    );
}

export default SmallInputSearch;