import { router } from 'client/router'
import 'client/style/index.css'

document.body.addEventListener('load', router('launcher'))
document.addEventListener('click', function (e) {
    if (e.target.getAttribute('action')) router(e.target.getAttribute('action'), JSON.parse(e.target.getAttribute('data-get')))
}, false)
