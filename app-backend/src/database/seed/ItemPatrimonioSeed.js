const Postagem = require("../model/ItemPatrimonio");

module.exports = (database) => {

  const novaPostagem = new Postagem({
    descricao: "Armário de arquivos",
    postagem: "jghdkhwgkhdkwhjdolujhwolpjdpçwpçjdpçwujpçdjwpçjkdpdpçwjdpj"
  });

  database.addItem(novaPostagem);
};
