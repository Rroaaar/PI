import React, { useEffect, useState } from 'react';
import './pagination.css';

export default function Pagination(props) {
  let { pages, onPageChange } = props;
  const [stateButtons, setStateButtons] = useState(1)

  if(pages>8) pages = 8

  const array = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <div className="paginationContainer">
      <div className="paginationSelector">
        {array.map((num) => (
          <div className={stateButtons === num? "activeButton": "page"} key={num}>
            <button onClick={() => {
                onPageChange(num)
                setStateButtons(num)
                }}>{num}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

