# react-authorized

一个可以让你控制自己的React组件是否有权限渲染的包。

## AuthorizedRoute 

一个组件可以让你用更轻松的方式去配置可带问权限控制的react路由

### 属性

- #### authorities

    类型: `string` | `string[]` | `Function`

    当类型是`string` 或者 `string[]` 的时候， 它代表着你当前用户的角色。运行时，它会与路由配置里面的每一项的`permission`属性进行比对，决定是否有访问的权限。

    当类型是`Function`时候， 他拥有唯一的回调参数`permissions`，取值来自各个路由配置的`permissions`属性， 它执行后返回一个布尔值决定你是否有权限访问。


- #### normalRoutes

    类型: `IRouteConfig[]`

    所有角色都可以访问的路由。

- #### normalLayout

    type: `ReactType`

    普通路由响应的组件都在此布局下渲染。

- #### authorizedRoutes

    type: `IRouteConfig[]`

    需要权限才能访问的路由。

- #### authorizedLayout

    type: `ReactType`

    需要权限才能访问的路由响应的组件会在此布局下渲染。

- #### notFound

    类型: `ReactType`

    路由匹配失败后渲染的组件。

- #### IRouteConfig.redirect

    类型: `string`

    当无权限访问该路由时跳转的路径。

- #### IRouteConfig.permissions

    类型: `string[]`

    该路由访问所需要的角色权限。如果为空，则所有角色都可访问。

- #### IRouteConfig.unauthorized

    type: `ReactType`

    如果设置了该属性，那么当路由无权限访问时将不会跳转链接，取而代之的是渲染该组件。

## checkPermission

一个判断是否拥有权限的函数。

### 参数

- authorities

    类型: `string` | `string[]` | `Function`

    当类型是`string` 或者 `string[]` 的时候， 它代表着你需要检测的角色。运行时，它会第二个参数`permission`属性进行比对，决定是否有访问的权限。

    当类型是`Function`时候， 他拥有唯一的回调参数`permissions`，取值来自第二个参数的`permissions`值， 它执行后返回一个布尔值决定你是否有权限访问。

- permissions

    type: `string` | `string[]`

    权限所需角色。为空则代表检测的角色不需要匹配，函数将返回true。

