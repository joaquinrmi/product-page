import React, { useState } from "react";

import "./gallery.scss";

export interface Props
{
    id: string;
    images: Array<string>;
    thumbnail: Array<string>;
}

const Gallery: React.FunctionComponent<Props> = (props) =>
{
    const [ currentPosition, setCurrentPosition ] = useState<number>(0);

    return <div id={props.id} className="gallery-container">
        <div className="image-slider">
            <div id={`card-container-${props.id}`} className={`card-container pos${currentPosition}`}>
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
                <div
                    id={`left-${props.id}`}
                    className="control"
                    onClick={() =>
                    {
                        setCurrentPosition((position) =>
                        {
                            if(position === 0)
                            {
                                return position;
                            }

                            return position - 1;
                        });
                    }}
                >
                    <i className="fi fi-rr-angle-small-left"></i>
                </div>
            </div>

            <div className="right-control-container">
                <div
                    id={`right-${props.id}`}
                    className="control"
                    onClick={() =>
                    {
                        setCurrentPosition((position) =>
                        {
                            if(position === props.images.length - 1)
                            {
                                return position;
                            }

                            return position + 1;
                        });
                    }}
                >
                    <i className="fi fi-rr-angle-small-right"></i>
                </div>
            </div>
        </div>

        <div className="thumbnails-container">
            {
                props.thumbnail.map((element, index) =>
                {
                    return <div
                        key={`thumb-${index}`}
                        id={`thumb-${index}-${props.id}`}
                        className={`thumbnail ${index === currentPosition ? "active" : ""}`}
                        onClick={async (ev) =>
                        {
                            setCurrentPosition(index);
                        }}
                    >
                        <img src={element} alt="" />
                        <div className="white-screen"></div>
                    </div>;
                })
            }
        </div>
    </div>;
}

export default Gallery;