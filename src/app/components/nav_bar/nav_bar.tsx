import React, { useState, useEffect } from "react";

import "./nav_bar.scss";

export interface Props
{
    id: string;
}

const NavBar: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const items = [
            document.getElementById(`collections-${props.id}`) as HTMLDivElement,
            document.getElementById(`men-${props.id}`) as HTMLDivElement,
            document.getElementById(`women-${props.id}`) as HTMLDivElement,
            document.getElementById(`about-${props.id}`) as HTMLDivElement,
            document.getElementById(`contact-${props.id}`) as HTMLDivElement,
        ];

        for(let i = 0; i < items.length; ++i)
        {
            (items[i].firstChild as HTMLSpanElement).onclick = () =>
            {
                for(let j = 0; j < items.length; ++j)
                {
                    if(j === i)
                    {
                        items[j].classList.add("active");
                    }
                    else
                    {
                        items[j].classList.remove("active");
                    }
                }
            };
        }
    },
    [ props.id ]);

    return <div id={props.id} className="nav-bar">
        <div id={`collections-${props.id}`} className="nav-item active">
            <span>Collections</span>
        </div>

        <div id={`men-${props.id}`} className="nav-item">
            <span>Men</span>
        </div>

        <div id={`women-${props.id}`} className="nav-item">
            <span>Women</span>
        </div>

        <div id={`about-${props.id}`} className="nav-item">
            <span>About</span>
        </div>

        <div id={`contact-${props.id}`} className="nav-item">
            <span>Contact</span>
        </div>
    </div>;
};

export default NavBar;