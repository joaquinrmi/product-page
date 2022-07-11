import React, { useState, useEffect } from "react";

import Product, { OrderData } from "../pages/product/";
import Modal, { ModalStatus } from "../components/modal/";
import CartProduct from "../components/cart_product/";
import NavBar from "./components/nav_bar/";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    const [ cartModalStatus, setCartModalStatus ] = useState<ModalStatus>(ModalStatus.Closed);
    const [ cartModalPosition, setCartModalPosition ] = useState<number>(0);
    const [ navigationStatus, setNavigationStatus ] = useState<ModalStatus>(ModalStatus.Closed);

    const [ shoppingCart, setShoppingCart ] = useState<ShoppingCart>({
        products: []
    });

    const removeProduct = (id: number) =>
    {
        setShoppingCart(state =>
        {
            const newState: ShoppingCart = {
                products: state.products
            };

            let index = -1;
            for(let i = 0; i < newState.products.length; ++i)
            {
                if(newState.products[i].id === id)
                {
                    index = i;
                    break;
                }
            }

            if(index !== -1)
            {
                newState.products.splice(index, 1);
            }

            return newState;
        });
    };

    useEffect(() =>
    {
        const app = document.getElementById("app") as HTMLDivElement;

        const cartButton = document.getElementById("open-cart-button") as HTMLDivElement;
        cartButton.onclick = (ev) =>
        {
            ev.stopPropagation();

            const width = app.getBoundingClientRect().width;
            const rect = cartButton.getBoundingClientRect();

            let position = rect.x + (rect.width / 2) - (375 / 2);
            if(position + 375 > width)
            {
                position -= (position + 375 - width);
            }
            
            setCartModalPosition(position);
            setCartModalStatus((status) =>
            {
                switch(status)
                {
                case ModalStatus.Closed:
                    return ModalStatus.Open;

                case ModalStatus.Closing:
                    return status;
                    
                case ModalStatus.Open:
                    return ModalStatus.Closing;
                }
            });
        };
    });

    return <div className="app">
        <header className="main">
            <div className="content">
                <div
                    id="open-navigation"
                    className="navigation item-button"
                    role="button"
                    onClick={() =>
                    {
                        setNavigationStatus(ModalStatus.Open);
                    }}
                >
                    <i className="fi fi-rr-menu-burger"></i>
                </div>

                <span className="title">
                    sneakers
                </span>

                <NavBar id="nav-bar" />

                <div className="cart-container">
                    <div id="open-cart-button" className="cart item-button">
                        <i className="fi fi-rr-shopping-cart"></i>
                        {shoppingCart.products.length > 0 ?
                            <span className="cart-count">{(() => {
                                let count = 0;
                                for(let i = 0; i < shoppingCart.products.length; ++i)
                                {
                                    count += shoppingCart.products[i].ammount;
                                }
                                return count;
                            })()}</span>
                            : null
                        }
                    </div>

                    <Modal
                        id="cart-modal"
                        className="shopping-cart"
                        status={cartModalStatus}
                        left={cartModalPosition}
                        closeRequest={() =>
                        {
                            setCartModalStatus(ModalStatus.Closed);
                        }}
                    >
                        <section className="shopping-cart-body">
                            <header className="cart-header">
                                Cart
                            </header>

                            <section className="cart-content">
                                {shoppingCart.products.length === 0 ?
                                    <div className="cart-empty">
                                        <span>
                                            Your cart is empty.
                                        </span>
                                    </div>
                                    
                                    :
                                
                                    shoppingCart.products.map((product, index) =>
                                    {
                                        return <CartProduct key={`sp-${index}`} id={`sp-${index}`} product={product} removeProduct={removeProduct} />
                                    })
                                }
                            </section>
                        </section>
                    </Modal>
                </div>

                <div className="profile-container">
                    <div className="profile item-button">
                        <i className="fi fi-rr-user"></i>
                    </div>
                </div>
            </div>
        </header>

        <Product id="sneakers" addToCart={(order: OrderData) =>
        {
            setShoppingCart(state =>
            {
                const newState: ShoppingCart = {
                    products: [ ...state.products ]
                };

                let found = false;
                for(let i = 0; i < newState.products.length; ++i)
                {
                    if(newState.products[i].id === order.id)
                    {
                        newState.products[i].ammount += order.ammount;
                        found = true;
                    }
                }

                if(!found)
                {
                    newState.products.push(order);
                }

                return newState;
            });
        }} />

        <Modal
            id="navigation-sidebar"
            className="navigation-sidebar"
            status={navigationStatus}
            closeAnimationTime={250}
            closeRequest={() =>
            {
                setNavigationStatus(ModalStatus.Closed);
            }}
        >
            <div className="navigation-body">
                <header className="navigation">
                    <div id="close-navigation" className="close-navigation" role="button">
                        <i className="fi fi-rr-cross"></i>
                    </div>
                </header>

                <section className="navigation">
                    <span>Collections</span>
                    <span>Men</span>
                    <span>Women</span>
                    <span>About</span>
                    <span>Contact</span>
                </section>
            </div>
        </Modal>
    </div>;
};

interface ShoppingCart
{
    products: Array<OrderData>;
}

export default App;