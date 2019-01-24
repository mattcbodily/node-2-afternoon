module.exports = {
    create: (req, res, next) => {
        const {name, description, price, image_url} = req.body;

        req.app.get('db').create_product([name, description, price, image_url])
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send({errorMessage: "Error!"}, console.log(err)))
    },

    getOne: (req, res, next) => {
        const {params} = req; 

        req.app.get('db').read_product([params.id])
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send({errorMessage: "Error!"}, console.log(err)))
    },

    getAll: (req, res, next) => {
        req.app.get('db').read_products()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send({errorMessage: "Error!"}, console.log(err)))
    },

    update: (req, res, next) => {
        const {params, query} = req;
        console.log(req.query)
        req.app.get('db').update_product([params.id, query.desc])
        .then(product => {
            
            res.status(200).send(product)})
        .catch(err => res.status(500).send({errorMessage: "Error!"}, console.log(err)))
    },

    delete: (req, res, next) => {
        const {params} = req;
        req.app.get('db').delete_product(params.id)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send({errorMessage: "Error!"}, console.log(err)))
    }

}