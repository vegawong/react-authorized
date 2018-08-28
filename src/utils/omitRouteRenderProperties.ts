import { omit } from 'lodash'
import { RouteProps } from 'react-router'

const OMIT_ROUTE_RENDER_PROPERTIES = ['render', 'component']

export interface IRouteConfig extends RouteProps {
    /**
     * 无权限的重定向跳转地址
     *
     * @type {string}
     * @memberof IRouteConfig
     */
    redirect?: string

    /**
     * 所需权限
     *
     * @type {string[]}
     * @memberof IAuthorizedRoute
     */
    permissions?: string[]

    /**
     * 权限校验失败后渲染的组件
     *
     * @type {React.ReactType}
     * @memberof IAuthorizedRoute
     */
    unauthorized?: React.ReactType
}

/**
 * 省略部分路由组件的属性，返回省略属性后的Route实例
 * @param route
 */
export const omitRouteRenderProperties = (route: IRouteConfig) =>
    omit<IRouteConfig>(route, OMIT_ROUTE_RENDER_PROPERTIES)
