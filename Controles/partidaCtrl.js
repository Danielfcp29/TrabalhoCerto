import Partida from "../Modelos/Partida.js";
export default class PartidaCtrl{ 
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const Preco = dados.Preco;
            const nome = dados.nome;
            const Local_partida = dados.Local_partida;
            const Times = dados.Times;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const Horario = dados.Horario;
            const email = dados.email;


            if (Preco && nome && Local_partida && Times && cidade && estado && Horario && email){
                const partida = new Partida(0, Preco, nome, Local_partida, Times, cidade, estado, Horario, email);
                partida.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Partida gravado com sucesso!",
                        "codigo_partida": partida.codigo
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o partida! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do partida, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um partida!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const codigo = requisicao.params.codigo;
            const Preco = dados.Preco;
            const nome = dados.nome;
            const Local_partida = dados.Local_partida;
            const Times = dados.Times;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const Horario = dados.Horario;
            const email = dados.email;
            if (codigo && codigo > 0 && Preco && nome && Local_partida && Times && cidade && estado && Horario && email)
            {
                const partida = new Partida(codigo, Preco, nome, Local_partida, Times, cidade, estado, Horario, email);
                partida.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Partida atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o partida! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do partida, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um partida!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            const codigo = requisicao.params.codigo;
            if (codigo && codigo > 0){
                const partida = new Partida(codigo);
                partida.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Partida excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o partida! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do partida que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um partida!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const partida = new Partida(0);
            partida.consultar(termoDePesquisa)
            .then((partidas)=>{
                resposta.status(200);
                resposta.json(partidas);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os partidas! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os partidas!"
            })
        }
    }

}