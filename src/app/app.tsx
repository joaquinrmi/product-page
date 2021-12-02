import React, { useState, useEffect } from "react";

import Product, { OrderData } from "../pages/product/";
import Modal, { ModalElement } from "../components/modal/";
import CartProduct from "../components/cart_product/";
import NavBar from "./components/nav_bar/";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
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

        const cartModal = document.getElementById("cart-modal") as ModalElement;

        const cartButton = document.getElementById("open-cart-button") as HTMLDivElement;
        cartButton.onclick = (ev) =>
        {
            const width = app.getBoundingClientRect().width;
            const rect = cartButton.getBoundingClientRect();

            let position = rect.x + (rect.width / 2) - (375 / 2);
            if(position + 375 > width)
            {
                position -= (position + 375 - width);
            }

            ev.stopPropagation();
            
            if(cartModal.isOpened())
            {
                cartModal.close();
            }
            else
            {
                cartModal.open();
                cartModal.style.left = `${position}px`;
            }
        };
    });

    useEffect(() =>
    {
        const navigationSidebar = document.getElementById("navigation-sidebar") as HTMLDivElement;

        const openNavigation = document.getElementById("open-navigation") as HTMLDivElement;
        openNavigation.onclick = () =>
        {
            navigationSidebar.classList.remove("closed");
            navigationSidebar.classList.add("opened");
        };

        const closeNavigation = document.getElementById("close-navigation") as HTMLDivElement;
        closeNavigation.onclick = () =>
        {
            navigationSidebar.classList.remove("opened");
            navigationSidebar.classList.add("closing");
            setTimeout(() =>
            {
                navigationSidebar.classList.remove("closing");
                navigationSidebar.classList.add("closed");
            },
            250);
        };
    },
    []);

    return <div className="app">
        <header className="main">
            <div className="content">
                <div id="open-navigation" className="navigation item-button" role="button">
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

                    <Modal id="cart-modal" className="shopping-cart">
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

        <div id="navigation-sidebar" className="navigation-sidebar closed">
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
        </div>
    </div>;
};

interface ShoppingCart
{
    products: Array<OrderData>;
}

export default App;