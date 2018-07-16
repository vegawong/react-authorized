import { isEmpty } from 'lodash'
import { isArray } from 'lodash'
import { isString } from 'lodash'
import { isFunction } from 'lodash'
import { indexOf } from 'lodash'

export type AuthorityType =
    | string
    | string[]
    | ((permissions: string | string[]) => any)

/**
 * 检查权限
 *
 * @param {AuthorityType} authorities 权限检测，如果是string | string[] 则与第二个参数进行匹配，如果是函数，第二个参数可省略并作为第一个函数参数的参数，返回该函数执行结果
 * @param {(string | string[])} [permissions] 可选，所需权限，数组情况下满足任意一个即可
 * @returns {boolean}
 */
export const checkPermissions = (
    authorities: AuthorityType,
    permissions: string | string[]
): boolean => {
    if (isEmpty(permissions)) {
        return true
    }

    if (isArray(authorities)) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < (authorities as string[]).length; i += 1) {
            if (indexOf(permissions, authorities[i]) !== -1) {
                return true
            }
        }
        return false
    }

    if (isString(authorities)) {
        return indexOf(permissions, authorities) !== -1
    }

    if (isFunction(authorities)) {
        return (authorities as (permissions: string | string[]) => any)(
            permissions
        )
    }

    throw new Error('[react-authorized]: Unsupport type of authorities.')
}

