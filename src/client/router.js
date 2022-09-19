import * as dashboard from "client/vue/dashboard.vue"
import {render} from "client/utils/render";

/**
 *
 * @param {String} route
 * @param {Object} params
 * @returns {Function}
 */
export function router(route, params = '') {
    return {
        launcher: (p) => render(dashboard),
    }[route](params)
}
