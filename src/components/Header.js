import { useContext,useEffect, useRef, useState } from "react";
import {Context} from '../Context';
function Header(){
    const [size,setSize]=useState('150px');
    const [headersize,setHeaderSize]=useState('170px');
    const {setFlag}=useContext(Context);
    const [headertext,setHeaderText]=useState("");
    const dic="DICTIONARY";
    const index=useRef(0);
    

   useEffect(()=>{
    function showHeader() {
        setHeaderText(prev => prev + dic[index.current]);
        index.current++;
      }
       if (index.current < dic.length) {
        let addChar = setInterval(showHeader, 300);
        return () => clearInterval(addChar);
      }
      if(headertext.length===10){

          setInterval((()=>{setFlag(true);
            setHeaderSize('48px');
          setSize('32px');
        }),4000);
          
      }
   },[headertext,setFlag])
   
   
   
    return(
        <div className="header" style={{height:headersize}}>
            <h1 style={{fontSize:size}}>{headertext}</h1>
        </div>
    )
}
export default Header;