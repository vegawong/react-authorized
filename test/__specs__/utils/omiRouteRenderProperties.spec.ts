import { omitRouteRenderProperties } from '../../../src/utils/omitRouteRenderProperties'

describe('omitRouteRenderProperties', () => {
    test('empty authorities', () => {
        expect(
            omitRouteRenderProperties({
                path: '/',
                component: () => null,
                render: () => null
            })
        ).toEqual({
            path: '/'
        })
    })
})
