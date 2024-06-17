
import React, { useState } from "react";
import questions from "./accordiandata.js";
import "./accordian.css";

const Accordian = () => {
  const [qnData, setQnData] = useState(questions);
  const [openitemids, setopenitemids] = useState([]);
  const [openid, setOpenId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (event) => {
    setIsChecked(event.target.checked);
    setopenitemids([]); // Reset the open items when toggling checkbox
    setOpenId(null);    // Reset the open item ID
  };

  const handleopenans = (id) => {
    if (isChecked) {
      // Handle multiple accordions
      if (openitemids.includes(id)) {
        setopenitemids(openitemids.filter(itemId => itemId !== id));
      } else {
        setopenitemids([...openitemids, id]);
      }
    } else {
      // Handle single accordion
      setOpenId(openid === id ? null : id);
    }
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>
        Allow multiple accordions open?
        <input type="checkbox" onChange={handleCheckbox} />
      </h3>
      {qnData.map((el, index) => {
        const isOpen = isChecked ? openitemids.includes(el.id) : openid === el.id;
        return (
          <div key={index} style={{ border: "1px dotted", padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ textAlign: "center" }}>{el.title}</h4>
              <span className="btn" onClick={() => handleopenans(el.id)}>
                {isOpen ? "-" : "+"}
              </span>
            </div>
            {isOpen && <p>{el.info}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
