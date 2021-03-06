import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
    return (
        <Switch>
            {/* Use these routes while building. They are not authenticated*/}
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />

            {/* Once you are ready for authentication, uncomment these routes and remove the above routes*/}
            
            {/* <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
            <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} /> */}
            {/* Example of routes for your pages*/}
            {/* <AuthenticatedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
            <AuthenticatedRoute path="/notes/:id" exact component={Notes} appProps={appProps} /> */}
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}