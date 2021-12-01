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
    return <button id={props.id} className="add-to-cart">
        {props.icon ? <i className="fi fi-rr-shopping-cart"></i> : null}
        <span className="content">
            {props.text}
        </span>
    </button>;
};

export default Button;