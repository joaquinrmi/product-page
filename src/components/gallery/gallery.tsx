import React, { useEffect } from "react";

import "./gallery.scss";

export interface Props
{
    id: string;
    images: Array<string>;
    thumbnail: Array<string>;
}

let moveGallery: (position: number) => Promise<void>;

let moving = false;

const Gallery: React.FunctionComponent<Props> = (props) =>
{
    let currentPosition = 0;

    useEffect(() =>
    {
        const thumbnails = [
            document.getElementById(`thumb-0-${props.id}`) as HTMLDivElement,
            document.getElementById(`thumb-1-${props.id}`) as HTMLDivElement,
            document.getElementById(`thumb-2-${props.id}`) as HTMLDivElement,
            document.getElementById(`thumb-3-${props.id}`) as HTMLDivElement,
        ];

        moveGallery = async (position: number) =>
        {
            cardContainer.classList.remove(`pos${currentPosition}`);
            cardContainer.classList.add(`pos${position}`);

            thumbnails[currentPosition].classList.remove("active");
            currentPosition = position;
            thumbnails[currentPosition].classList.add("active");

            return new Promise<void>(resolve =>
            {
                setTimeout(() =>
                {
                    buttonDelay = true;
                    resolve();
                },
                500);
            });
        };

        let buttonDelay = true;

        const leftButton = document.getElementById(`left-${props.id}`) as HTMLDivElement;
        const rightButton = document.getElementById(`right-${props.id}`) as HTMLDivElement;

        const cardContainer = document.getElementById(`card-container-${props.id}`) as HTMLDivElement;

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

            moveGallery(currentPosition - 1);
        };

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

            moveGallery(currentPosition + 1);
        };
    },
    [
        props.images
    ]);

    return <div id={props.id} className="gallery-container">
        <div className="image-slider">
            <div id={`card-container-${props.id}`} className="card-container">
                {
                    props.images.map((element, index) =>
                    {
                        return <div key={`card-${index}`} id={`card-${index}-${props.id}`} className="slider-element">
                            <img src={element} alt="" />
                        </div>
                    })
                }
            </div>

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
        </div>

        <div className="thumbnails-container">
            {
                props.thumbnail.map((element, index) =>
                {
                    return <div key={`thumb-${index}`} id={`thumb-${index}-${props.id}`} className={`thumbnail ${index === 0 ? "active" : ""}`} onClick={async (ev) =>
                    {
                        if(moving)
                        {
                            return;
                        }
                        moving = true;
                        
                        await moveGallery(index);
                        moving = false;
                    }}>
                        <img src={element} alt="" />
                        <div className="white-screen"></div>
                    </div>;
                })
            }
        </div>
    </div>;
}

export default Gallery;