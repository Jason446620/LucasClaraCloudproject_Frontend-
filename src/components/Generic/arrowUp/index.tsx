import react, { useState } from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';

//import styles
import './style.css';


const ArrowUp = () =>{

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300){
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 300){
        setShowScroll(false)
      }
    };
  
    const scrollTop = () =>{
      window.scrollTo({top: 0, behavior: 'smooth'});
    };
  
    window.addEventListener('scroll', checkScrollTop)
    
    return(
        <div>
            <FaArrowCircleUp  id='top' onClick={scrollTop} style={{ display: showScroll ? 'flex' : 'none'}}/>
        </div>
    );
}

export default ArrowUp;