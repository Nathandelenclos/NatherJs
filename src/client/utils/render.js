/**
 * Render desired page
 * @param {Module} page
 * @param {Object} params
 * @param {Boolean} middleware
 */
export function render (page, params, middleware = true)  {
    document.body.innerHTML = ''
    let styleEl = document.getElementById('dynamic-style')
    styleEl.remove()
    if (middleware) {
        if (page.title)
            document.querySelector('title').textContent = page.title;
        if (page.header)
            document.querySelector('head').insertAdjacentHTML("beforeend", page.header)
        document.body.insertAdjacentHTML('beforeend', page.generateHtml(params))
        styleEl = document.createElement('style')
        styleEl.setAttribute('id', 'dynamic-style')
        document.head.appendChild(styleEl)
        styleEl.insertAdjacentHTML("beforeend", page.generateStyle(params))
        page.generateScript(params)
    }
}
