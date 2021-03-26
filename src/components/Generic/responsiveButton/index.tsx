import React, {ButtonHTMLAttributes} from 'react';

//import style
import './style.css'

interface ResponsiveBtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    value: string;
    typeBtn: string;
}

const ResponsiveBtn:React.FC<ResponsiveBtnProps> = ({value, typeBtn}) =>{
    return(
        <div>
           <input className={typeBtn} type='submit' value={value}/>           
        </div>
    );
}

export default ResponsiveBtn;