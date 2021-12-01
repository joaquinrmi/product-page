import React, { useState, useEffect } from "react";

import Gallery from "../../components/gallery/";
import Button from "../../components/button/";

import "./product.scss";

export interface Props
{
    id: string;
    addToCart(order: OrderData): void;
}

const Product: React.FunctionComponent<Props> = (props) =>
{
    const [ productData, setProductData ] = useState<ProductState>({
        loaded: false,
        product: {
            id: -1,
            title: "",
            company: "",
            description: "",
            prize: 0,
            discount: 0,
            gallery: [],
            thumbnail: []
        }
    });

    useEffect(() =>
    {
        if(productData.loaded)
        {
            return;
        }

        setProductData({
            loaded: true,
            product: {
                id: 0,
                title: "Fall Limited Edition Sneakers",
                company: "SNEAKER COMPANY",
                description: "These low-profile sneakers are you perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
                prize: 250,
                discount: 50,
                gallery: [
                    `${process.env.PUBLIC_URL}/img/image-product-1.jpg`,
                    `${process.env.PUBLIC_URL}/img/image-product-2.jpg`,
                    `${process.env.PUBLIC_URL}/img/image-product-3.jpg`,
                    `${process.env.PUBLIC_URL}/img/image-product-4.jpg`
                ],
                thumbnail: [
                    `${process.env.PUBLIC_URL}/img/image-product-1-thumbnail.jpg`,
                    `${process.env.PUBLIC_URL}/img/image-product-2-thumbnail.jpg`,
                    `${process.env.PUBLIC_URL}/img/image-product-3-thumbnail.jpg`,
                    `${process.env.PUBLIC_URL}/img/image-product-4-thumbnail.jpg`
                ]
            }
        });
    },
    [ productData.loaded ]);

    useEffect(() =>
    {
        const subtract = document.getElementById(`subtract-${props.id}`) as HTMLSpanElement;
        const add = document.getElementById(`add-${props.id}`) as HTMLSpanElement;
        const ammount = document.getElementById(`ammount-${props.id}`) as HTMLSpanElement;

        subtract.onclick = () =>
        {
            const value = Number(ammount.innerText);
            if(value === 0)
            {
                return;
            }

            ammount.innerText = String(value - 1);
        };

        add.onclick = () =>
        {
            ammount.innerText = String(Number(ammount.innerText) + 1);
        };

        const addButton = document.getElementById(`add-cart-${props.id}`) as HTMLButtonElement;
        addButton.onclick = () =>
        {
            const productCount = Number(ammount.innerText);

            if(productCount === 0)
            {
                return;
            }

            ammount.innerText = "0";

            props.addToCart({
                id: productData.product.id,
                title: productData.product.title,
                ammount: productCount,
                finalPrize: productData.product.prize - (productData.product.prize * productData.product.discount / 100),
                thumbnail: productData.product.thumbnail[0],
            });
        };
    });

    return <div className="product">
        <section className="product-body">
            <section className="gallery">
                <Gallery id="product-gallery" images={productData.product.gallery} thumbnail={productData.product.thumbnail} />
            </section>

            <section className="information">
                <div className="title">
                    <span className="company">
                        {productData.product.company}
                    </span>

                    <span className="title">
                        {productData.product.title}
                    </span>
                </div>

                <div className="description">
                    {productData.product.description}
                </div>

                <div className="prize-container">
                    <span className="prize">
                        ${(productData.product.prize - (productData.product.prize * productData.product.discount / 100)).toFixed(2)}
                    </span>

                    <div className="discount-container">
                        <span>
                            {productData.product.discount}%
                        </span>
                    </div>

                    <span className="actually-prize">
                        ${productData.product.prize.toFixed(2)}
                    </span>
                </div>

                <div className="buy-container">
                    <div className="order">
                        <span id={`subtract-${props.id}`} className="subtract" role="button">
                            -
                        </span>

                        <span id={`ammount-${props.id}`} className="ammount">
                            0
                        </span>

                        <span id={`add-${props.id}`} className="add" role="button">
                            +
                        </span>
                    </div>

                    <Button id={`add-cart-${props.id}`} text="Add to cart" icon={<i className="fi fi-rr-shopping-cart"></i>} />
                </div>
            </section>
        </section>
    </div>;
};

export interface OrderData
{
    id: number;
    title: string;
    finalPrize: number;
    ammount: number;
    thumbnail: string;
}

interface ProductInformation
{
    id: number;
    title: string;
    company: string;
    description: string;
    prize: number;
    discount: number;
    gallery: Array<string>;
    thumbnail: Array<string>;
}

interface ProductState
{
    loaded: boolean;
    product: ProductInformation;
}

export default Product;