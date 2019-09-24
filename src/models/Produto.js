const {Schema, model} = require('mongoose');

const ProdutoSchema = new Schema({
        nome: {
            type: String,
            minlength: [2, 'O nome é muito curto'],
            maxlength: [100, 'O nome é muito longo'],
            required: [true, 'O nome do produto é obrigatório']
        },
        descricao: {
            type: String,
            maxlength: [1000, 'A descrição é muito longa'],
            required: false
        },
        codigo_barra: {
            type: String,
            unique: true, //Criamos um índice único
            required: [true, 'O código de barras do produto é obrigatório'],
            minlength: [13, 'O código de barras deve conter no mínimo 13 caracteres'], //sem ponto
            maxlength: [15, 'O código de barras deve conter no máximo 15 caracteres'],//com ponto
            validate: {
                validator: function (codigo_barras) { //Utilizaremos Regex para validar
                    return /^([0-9]{1}[.]?[0-9]{6}[.]?[0-9]{6})$/.test(codigo_barras);
                },
                message: props => props.value + ' não é um código de barras válido!'
            }
        },
        preco: Number
    },
    {
        timestamps: true
    });

module.exports = model('Produto', ProdutoSchema);
