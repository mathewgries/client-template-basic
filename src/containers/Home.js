import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
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
        return API.get("accounts", "/accounts");
    }

    function renderItemsList(items) {
        return [{}].concat(items).map((item, i) =>
            i !== 0 ? (
                <LinkContainer key={item.accountId} to={`/accounts/${items.accountId}`}>
                    <ListGroupItem header={item.content.trim().split("\n")[0]}>
                        {"Created: " + new Date(item.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <LinkContainer key="new" to="/accounts/new">
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Create a new item
                </h4>
                        </ListGroupItem>
                    </LinkContainer>
                )
        );
    }

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
            <div className="notes">
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