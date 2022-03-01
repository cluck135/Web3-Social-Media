import React from "react";

function Footer(props) {
  return (
    <div className="footer">
      <h3>Created by 3 Bootcamp students who have made it through.</h3>
      <h4>
        <a href="https://github.com/kathrynneal221">Kathryn Neal</a> |{" "}
        <a href="https://github.com/cluck135">Casen Luck</a> |{" "}
        <a href="https://github.com/tallen1985">Troy Allen</a>
      </h4>
      <button onClick={props.toggleLoggedIn}>Toggle logged in</button>
    </div>
  );
}

export default Footer;
