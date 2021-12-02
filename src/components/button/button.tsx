import React from "react";

import "./button.scss";

export interface Props
{
    id: string;
    text: string;
    icon?: any;
}

const Button: React.FunctionComponent<Props> = (props) =>
{
    return <button id={props.id} className="standar-button">
        {props.icon ? <i className="fi fi-rr-shopping-cart"></i> : null}
        <span className="button-content">
            {props.text}
        </span>
    </button>;
};

export default Button;