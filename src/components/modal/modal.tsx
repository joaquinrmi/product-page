import React, { useEffect } from "react";

import "./modal.scss";

export interface Props
{
    id: string;
    className?: string;
}

export interface ModalElement extends HTMLDivElement
{
    open(): void;
    close(): void;
    isOpened(): boolean;
}

const Modal: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const modal = document.getElementById(props.id) as ModalElement;

        modal.open = () =>
        {
            modal.classList.remove("closed");
            modal.classList.add("opened");
        };

        modal.close = () =>
        {
            modal.classList.remove("opened");
            modal.classList.add("closed");
        };

        modal.isOpened = () =>
        {
            return modal.classList.contains("opened");
        };

        if(props.className)
        {
            modal.classList.add(props.className);
        }
    },
    [
        props.id, props.className
    ]);

    useEffect(() =>
    {
        const modal = document.getElementById(props.id) as ModalElement;

        modal.addEventListener("click", (ev) =>
        {
            ev.stopPropagation();
        });

        const closeModal = () =>
        {
            modal.close();
        };

        document.addEventListener("click", closeModal);

        return () =>
        {
            document.removeEventListener("click", closeModal);
        };
    },
    []);

    return <div id={props.id} className="modal closed">
        {props.children}
    </div>;
};

export default Modal;