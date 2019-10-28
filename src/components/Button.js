import React from "react";

import "components/Button.scss";
const classnames = require('classnames');

   export default function Button(props) {
      const buttonClass = classnames("button", {
         "button--confirm": props.confirm,
         "button--danger": props.danger
       });
    
      return ( <button 
      className={buttonClass}
      onClick={props.onClick}
      disable={props.disabled}
      >
      {props.children}
      </button>
      );
    }

