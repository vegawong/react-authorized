# react-authorized

A smart package which can control your react-component rendering permission.

## AuthorizedRoute 

A ReactComponent you can make a permission control route config via a smart way.

### Properties

- #### authorities

    type: `string` | `string[]` | `Function`

    When it's valueType is `string` or `string[]`, it is your current authority, and it would diff with all the `permissions` in eveny routeConfig item, whether can be acessed or not.

    When it's valueType is `Funtion`, it also has the only one argument `permissions` the same as the routeConfig's property `permissions`. It returns a `boolean` value that you can access the all the `authorizedRoutes` or not.

- #### normalRoutes

    type: `IRouteConfig[]`

    Which can access with all authorities.

- #### normalLayout

    type: `ReactType`

    Normal route will be rendered as the component's children

- #### authorizedRoutes

    type: `IRouteConfig[]`

    Which can access with authorities validated.

- #### authorizedLayout

    type: `ReactType`

    Authorized route will be rendered as the component's children

- #### notFound

    type: `ReactType`

    The component would be render when the path is not match.

- #### IRouteConfig.redirect

    type: `string`

    Will redirect to the path when the auth is not validated.

- #### IRouteConfig.permissions

    type: `string[]`

    Can acceess when auth within

- #### IRouteConfig.unauthorized

    type: `ReactType`

    If it's setted, it would be rendered when has not permission instead of redirect a path.

## checkPermission

A function to check has the permission or not.

### Arguments

- authorities

    type: `string` | `string[]` | `Function`

    When it's valueType is `string` or `string[]`, it is your current authority, and it would diff with all the `permissions` in eveny routeConfig item, whether can be acessed or not.

    When it's valueType is `Funtion`, it also has the only one call back argument `permissions` the same as the second property `permissions`. It returns a `boolean` value.
    
- permissions

    type: `string` | `string[]`

    Check it's in the permissions you need or not. If it's not setted, it return true.

## DEMO

```jsx
/*
 * render component
 */

import React from 'react'
import { Router } from 'react-router-dom'
import { AuthorizedRoute } from 'react-authorized/lib'

// 当前角色
const currAuth = [] // change to ['user'] when login successfully

// the route does not need authorize
export const normalRoutes: IRoute[] = [
    {
        path: '/login',
        component: Login
    }
]

// the route needed authorize
export const authorizedRoutes: IRoute[] = [
    {
        path: '/',
        component: () => <Redirect to="/workspace" />,
        permissions: ['user'], // the permissions which needs to verify
        pathName: '首页',
        exact: true
    },
]


class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <AuthorizedRoute
                    authorities={currAuth}
                    normalRoutes={normalRoutes}
                    authorizedRoutes={authorizedRoutes}
                />
            </Router>
        )
    }
}


```
