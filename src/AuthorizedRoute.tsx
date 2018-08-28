import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { map } from 'lodash'
import { isNil } from 'lodash'
import {
    IRouteConfig, omitRouteRenderProperties
} from './utils/omitRouteRenderProperties'
import { AuthorityType, checkPermissions } from './utils/checkPermission'
import DefaultLayout from './DefaultLayout'
import DefaultNotFound from './DefaultNotFound'

/**
 * 权限路由组件的属性
 *
 * @export
 * @interface IAuthorizedRouteProps
 */
export interface IAuthorizedRouteProps {
    /**
     * 权限校验/当前角色
     */
    authorities?: AuthorityType
    /**
     * 无需校验权限的路由配置
     *
     * @type {IRouteConfig[]}
     * @memberof IAuthorizedRouteProps
     */
    normalRoutes?: IRouteConfig[]
    /**
     * 无需校验权限的布局组件
     */
    normalLayout?: React.ReactType
    /**
     * 需要权限校验的路由配置
     */
    authorizedRoutes?: IRouteConfig[]
    /**
     * 需要权限校验的布局组件
     */
    authorizedLayout?: React.ReactType
    /**
     * 地址匹配失败的默认渲染组件
     */
    notFound?: React.ReactType
}

export class AuthorizedRoute extends React.Component<IAuthorizedRouteProps> {
    public static defaultProps: Partial<IAuthorizedRouteProps> = {
        authorities: '',
        normalRoutes: [],
        normalLayout: DefaultLayout,
        authorizedRoutes: [],
        authorizedLayout: DefaultLayout,
        notFound: DefaultNotFound
    }

    renderRedirectRoute = (route: IRouteConfig) => (
        <Route
            key={route.path}
            {...omitRouteRenderProperties(route)}
            render={() => <Redirect to={route.redirect} />}
        />
    )

    /**
     * props pass to Layout & Component are history, location, match
     */
    renderAuthorizedRoute = (route: IRouteConfig) => {
        const { authorizedLayout: AuthorizedLayout, authorities } = this.props
        const {
            permissions,
            path,
            component: RouteComponent,
            unauthorized: Unauthorized
        } = route
        const hasPermission = checkPermissions(authorities, permissions)

        if (!hasPermission && route.unauthorized) {
            return (
                <Route
                    key={path}
                    {...omitRouteRenderProperties(route)}
                    render={props => (
                        <AuthorizedLayout {...props}>
                            <Unauthorized {...props} />
                        </AuthorizedLayout>
                    )}
                />
            )
        }

        if (!hasPermission && route.redirect) {
            return this.renderRedirectRoute(route)
        }

        return (
            <Route
                key={path}
                {...omitRouteRenderProperties(route)}
                render={props => (
                    <AuthorizedLayout {...props}>
                        <RouteComponent {...props} />
                    </AuthorizedLayout>
                )}
            />
        )
    }

    /**
     * props pass to Layout & Component are history, location, match
     */
    renderUnAuthorizedRoute = (route: IRouteConfig) => {
        const { normalLayout: NormalLayout } = this.props
        const { redirect, path, component: RouteComponent } = route

        // check if current route is a redirect route (doesn't have component but redirect path)
        if (isNil(RouteComponent) && !isNil(redirect)) {
            return this.renderRedirectRoute(route)
        }

        return (
            <Route
                key={path}
                {...omitRouteRenderProperties(route)}
                render={props => (
                    <NormalLayout {...props}>
                        <RouteComponent {...props} />
                    </NormalLayout>
                )}
            />
        )
    }

    renderNotFoundRoute = () => {
        const { notFound: NotFound } = this.props
        return <Route render={props => <NotFound {...props} />} />
    }

    render() {
        const { normalRoutes, authorizedRoutes } = this.props
        return (
            <Switch>
                {map(normalRoutes, route =>
                    this.renderUnAuthorizedRoute(route)
                )}
                {map(authorizedRoutes, route =>
                    this.renderAuthorizedRoute(route)
                )}
                {this.renderNotFoundRoute()}
            </Switch>
        )
    }
}
