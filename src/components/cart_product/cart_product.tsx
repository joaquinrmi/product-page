import React, { useEffect } from "react";

import { OrderData } from "../../pages/product";
import Button from "../button/";

import "./cart_product.scss";

export interface Props
{
    id: string;
    product: OrderData;
    removeProduct(id: number): void;
}

const CartProduct: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const trash = document.getElementById(`trash-${props.id}`) as HTMLSpanElement;

        trash.onclick = () =>
        {
            props.removeProduct(props.product.id);
        };
    });

    return <div id={props.id} className="cart-product">
        <section className="info">
            <div className="thumbnail-container">
                <img src={props.product.thumbnail} alt="" />
            </div>

            <div className="text">
                <span className="cart-title">
                    {props.product.title.substr(0, 22)}...
                </span>

                <span className="prize">
                    ${props.product.finalPrize.toFixed(2)} x {props.product.ammount} <span className="total">
                        ${(props.product.finalPrize * props.product.ammount).toFixed(2)}
                    </span>
                </span>
            </div>

            <div className="erase-container">
                <span id={`trash-${props.id}`}>
                    <i className="fi fi-rr-trash"></i>
                </span>
            </div>
        </section>

        <section className="cart-button">
            <Button id="checkout-button" text="Checkout" />
        </section>
    </div>;
};

export default CartProduct;