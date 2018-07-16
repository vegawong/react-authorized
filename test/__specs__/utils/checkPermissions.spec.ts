import { indexOf } from 'lodash'
import { checkPermissions } from '../../.../../../src/utils/checkPermission'

describe('checkPermission Test', () => {
    test('empty authorities', () => {
        expect(checkPermissions('', [])).toEqual(true)
    })

    test('array authorities no match', () => {
        expect(checkPermissions(['user'], ['admin'])).toEqual(false)
    })

    test('array authorities single match', () => {
        expect(checkPermissions(['admin'], ['admin'])).toEqual(true)
    })

    test('array authorities multiple match', () => {
        expect(checkPermissions(['admin', 'user'], ['admin', 'user'])).toEqual(
            true
        )
    })

    test('string authorities', () => {
        expect(checkPermissions('admin', ['admin', 'user'])).toEqual(true)
    })

    test('function authorities', () => {
        expect(
            checkPermissions(
                permissions => indexOf(permissions, 'admin') !== -1,
                ['admin', 'user']
            )
        ).toEqual(true)
    })

    test('unsupport type of authorities', () => {
        const num = 123 as any
        expect(() => checkPermissions(num, ['admin'])).toThrowError(
            '[react-authorized]: Unsupport type of authorities.'
        )
    })
})
