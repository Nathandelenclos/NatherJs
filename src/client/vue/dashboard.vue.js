/**
 * {Array<Module>}
 */
export const components = []
//export const title = ""
//export const header = ``

/**
 *
 * @param {Object} params
 * @returns {String}
 */
export function generateHtml(params) {
    return `
    <h1>titre</h1>
    <img src="/logo.png" alt="test">
    <p>test</p>
    `
}

/**
 *
 * @param {Object} params
 */
export function generateScript(params) {
    return undefined
}

/**
 *
 * @param {Object} params
 * @returns {String}
 */
export function generateStyle(params) {
    let stylesComponents = ''
    components.forEach(e => stylesComponents += e.renderStyle())
    return stylesComponents + `
    `
}
