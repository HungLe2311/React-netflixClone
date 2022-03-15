import React from "react";
import './MovieRow.css';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({title, items}) => {
    const urlRight = "https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-right.png";
    const urlLeft = "https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png";
    return (
        <div className="movieRow">
        <h2>{title}</h2>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
           <div className="movieRow--left">
               <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png"/>
           </div>
   

           <div className="movieRow--listarea">
               <div className="movieRow--list">
                   {items.results?.length > 0 && items.results.map((item, key)=>(
                       <div key={key} className="movieRow--item">
                          <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
                       </div>
                   )) }
               </div>
           </div>


             <div className="movieRow--right">
               <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-right.png"/>
           </div>
        </div>
    </div>

    );
};