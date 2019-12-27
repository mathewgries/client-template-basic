import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
    // This is the state for our componen
    // This holds the list of objects for the user when they log in
    // You can rename the variables to match your object type
    // Example: for a notes app, you can name items as notes, and
    // setItems as setNotes. They are loaded in the useEffect method below.
    // Rename all instances to match your object name.
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const items = await loadItems();
                setItems(items);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadItems() {
        //replace "accounts" with your site db and endpoint
        return API.get("items", "/items");
    }

    // Loop through the items loaded from the database and display them in a list 
    // component on the home page.
    function renderItemsList(items) {
        return [{}].concat(items).map((item, i) =>
            i !== 0 ? (
                <LinkContainer key={item.accountId} to={`/items/${items.accountId}`}>
                    <ListGroupItem header={item.content.trim().split("\n")[0]}>
                        {"Created: " + new Date(item.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <LinkContainer key="new" to="/items/new">
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Create a new item
                </h4>
                        </ListGroupItem>
                    </LinkContainer>
                )
        );
    }

    // The next two functions are called in the render function at the end of this component
    // If the user has not logged in, renderLander will be called. If the user is logged in
    // renderItems will be called, and display their list of items from the database
    function renderLander() {
        return (
            <div className="lander">
                <h1>Welcome Message</h1>
                <p>Site Description</p>
            </div>
        );
    }

    function renderItems() {
        return (
            <div className="items">
                <PageHeader>Your Items</PageHeader>
                <ListGroup>
                    {!isLoading && renderItemsList(items)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderItems() : renderLander()}
        </div>
    );
}