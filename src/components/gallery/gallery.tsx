import React, { useEffect } from "react";

import "./gallery.scss";

export interface Props
{
    id: string;
    images: Array<string>;
    thumbnail: Array<string>;
}

const Gallery: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const card1 = document.getElementById(`card1-${props.id}`) as HTMLDivElement;
        card1.classList.remove("animated-left");
        card1.classList.remove("animated-right");
        
        const card2 = document.getElementById(`card2-${props.id}`) as HTMLDivElement;
        card2.classList.remove("animated-left");
        card2.classList.remove("animated-right");
        
        const card3 = document.getElementById(`card3-${props.id}`) as HTMLDivElement;
        card3.classList.remove("animated-left");
        card3.classList.remove("animated-right");
    });

    useEffect(() =>
    {
        const cards = [
            document.getElementById(`card1-${props.id}`) as HTMLDivElement,
            document.getElementById(`card2-${props.id}`) as HTMLDivElement,
            document.getElementById(`card3-${props.id}`) as HTMLDivElement,
        ];

        let currentPosition = 0;

        const slidePosition = [
            -1, 0, 1
        ];

        let buttonDelay = true;

        const leftButton = document.getElementById(`left-${props.id}`) as HTMLDivElement;
        leftButton.onclick = () =>
        {
            if(currentPosition === 0)
            {
                return;
            }

            if(!buttonDelay)
            {
                return;
            }
            buttonDelay = false;

            --currentPosition;

            for(let i = 0; i < cards.length; ++i)
            {                
                cards[i].classList.add("animated-right");
            }

            setTimeout(() =>
            {
                for(let i = 0; i < cards.length; ++i)
                {
                    switch(slidePosition[i])
                    {
                    case -1:
                        cards[i].classList.remove("first");
                        cards[i].classList.add("second");
                        slidePosition[i] = 0;
                        break;

                    case 0:
                        cards[i].classList.remove("second");
                        cards[i].classList.add("third");
                        slidePosition[i] = 1;
                        break;

                    case 1:
                        cards[i].classList.remove("third");
                        cards[i].classList.add("first");
                        (cards[i].children[0] as HTMLImageElement).src = props.images[currentPosition - 1];
                        slidePosition[i] = -1;
                        break;
                    }

                    cards[i].classList.remove("animated-right");
                }

                buttonDelay = true;
            },
            500);
        };

        const rightButton = document.getElementById(`right-${props.id}`) as HTMLDivElement;
        rightButton.onclick = () =>
        {
            if(currentPosition === props.images.length - 1)
            {
                return;
            }

            if(!buttonDelay)
            {
                return;
            }
            buttonDelay = false;

            ++currentPosition;

            for(let i = 0; i < cards.length; ++i)
            {                
                cards[i].classList.add("animated-left");
            }

            setTimeout(() =>
            {
                for(let i = 0; i < cards.length; ++i)
                {
                    switch(slidePosition[i])
                    {
                    case -1:
                        cards[i].classList.remove("first");
                        cards[i].classList.add("third");
                        (cards[i].children[0] as HTMLImageElement).src = props.images[currentPosition + 1];
                        slidePosition[i] = 1;
                        break;

                    case 0:
                        cards[i].classList.remove("second");
                        cards[i].classList.add("first");
                        slidePosition[i] = -1;
                        break;

                    case 1:
                        cards[i].classList.remove("third");
                        cards[i].classList.add("second");
                        slidePosition[i] = 0;
                        break;
                    }

                    cards[i].classList.remove("animated-left");
                }

                buttonDelay = true;
            },
            500);
        };
    },
    [
        props.images
    ]);

    return <div id={props.id} className="gallery-container">
        <div className="left-control-container">
            <div id={`left-${props.id}`} className="control">
                <i className="fi fi-rr-angle-small-left"></i>
            </div>
        </div>

        <div className="right-control-container">
            <div id={`right-${props.id}`} className="control">
                <i className="fi fi-rr-angle-small-right"></i>
            </div>
        </div>

        <div className="image-slider">
            <div id={`card1-${props.id}`} className="slider-element first">
                <img src={props.images[0]} alt="" />
            </div>
            <div id={`card2-${props.id}`} className="slider-element second">
                <img src={props.images[0]} alt="" />
            </div>
            <div id={`card3-${props.id}`} className="slider-element third">
                <img src={props.images[1]} alt="" />
            </div>
        </div>
        
    </div>;
}

export default Gallery;