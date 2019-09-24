const Produto = require('../models/Produto');

module.exports = {
    async index(req, res) {

        const produtos = await Produto.find(req.query).sort({nome: 1});

        return res.status(200).json(
            {
                success: true,
                data: produtos,
                message: 'DONE'
            }
        );
    },

    async show(req, res) {
        const {id} = req.params;

        await Produto.findById(id).then(data => {
            return res.status(200).json(
                {
                    success: true,
                    data: data,
                    message: 'DONE'
                }
            );
        }).catch(() => {
            return res.status(400).json(
                {
                    success: false,
                    message: 'NOT_FOUND'
                }
            );
        });


    },

    async store(req, res) {

        // Isso não está funcionando, verificar outro método para verificar se o body está vazio
        if (!req.body) {
            return res.status(400).json({
                message: 'A requisição está vazia'
            });
        }

        const {nome, descricao, codigo_barra, preco} = req.body;

        const produto_existe = await Produto.findOne({codigo_barra});

        if (produto_existe) {
            return res.status(409).json({success: false, message: 'Produto já cadastrado'})
        }

        await Produto.create({
            nome,
            descricao,
            codigo_barra,
            preco
        }, (err, produto) => {

            if (err) {
                let {errors} = err;
                let {nome, codigo_barra} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                } else if (codigo_barra) {
                    return res.status(400).json({success: false, message: codigo_barra.message});
                }
            } else if (produto) {
                return res.json({success: true, message: 'Produto inserido com sucesso'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome, descricao, codigo_barra, preco} = req.body;

        await Produto.updateOne({_id: id}, {nome, descricao, codigo_barra, preco}).then(data => {

            return res.status(200).json(
                {
                    success: true,
                    message: 'Produto alterado com sucesso'
                }
            );

        }).catch(err => {
            return res.status(200).json(
                {
                    success: false,
                    message: 'Erro ao alterar produto'
                }
            );
        });
    },

    async delete(req, res) {

        let {id} = req.params;

        await Produto.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Produto não encontrado'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Produto deletado com sucesso'
                }
            );

        });

    }

};
