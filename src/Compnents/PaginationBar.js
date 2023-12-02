import React, { useState } from "react";
import { ImFirst } from "react-icons/im";
import { ImPrevious2 } from "react-icons/im";
import { ImNext2 } from "react-icons/im";
import { ImLast } from "react-icons/im";
import "../Compnents/PaginationBar.css";

const PaginationBar = (props)=>{
   
     const{pageLength, pageNo, changePageNo} = props;
     const[currentPageNo,setCurrentPageNo] = useState(pageNo);

     const selectedPage = (e)=>{
         if(e>=1 && e<=pageLength && e!==currentPageNo)
         changePageNo(e);   
         setCurrentPageNo(e);
     }
     return(
        <div className="pagination">
            <p><strong>Page {currentPageNo} of {pageLength}</strong></p>&emsp;
            <button className="first-page" onClick={()=>selectedPage(1)} ><ImFirst /></button>
            <button className="previous-page" onClick={()=>selectedPage(currentPageNo - 1)}><ImPrevious2 /></button>
            {[...Array(pageLength)].map((j,i)=>{
               return(
                <button key={i+1} style={currentPageNo === i+1 ? {backgroundColor:"white",color:"rgb(0, 195, 255)",borderColor:"white"}:{}} className={currentPageNo === i+1?"current":"nums"} onClick={()=>selectedPage(i+1)}>{i+1}</button>
               ); 
            })}
            <button className="next-page" onClick={()=>selectedPage(currentPageNo+1)}><ImNext2 /></button>
            <button className="last-page" onClick={()=>selectedPage(pageLength)}><ImLast /></button>
        </div>
     )
}

export default PaginationBar;