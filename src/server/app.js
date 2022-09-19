export default [
    {method: "GET", name: '', middleware:[], controller: (req, res) => {res.send(JSON.stringify({hello: "world"}))}}
]