import conectar from "./Conexao.js";
import Partida from "../Modelos/Partida.js";
export default class PartidaDAO{
    async gravar(partida){
        if (partida instanceof Partida){
            const conexao = await conectar();
            const sql = `INSERT INTO partida (Preco, nome, Local_partida, Times,
                         cidade, estado, Horario, email) 
                         values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                partida.Preco,
                partida.nome,
                partida.Local_partida,
                partida.Times,
                partida.cidade,
                partida.estado,
                partida.Horario,
                partida.email
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            partida.codigo = resultados.insertId; 
        }
    }
    async atualizar(partida){
        if (partida instanceof Partida){
            const conexao = await conectar();
            const sql = `UPDATE partida SET Preco = ?,
                         nome = ?, Local_partida = ?, Times = ?,
                         cidade = ?, estado = ?, Horario = ?,
                         email = ? WHERE id = ?`;
            const parametros = [
                partida.Preco,
                partida.nome,
                partida.Local_partida,
                partida.Times,
                partida.cidade,
                partida.estado,
                partida.Horario,
                partida.email,
                partida.codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(partida){
        if (partida instanceof Partida){
            const conexao = await conectar();
            const sql = `DELETE FROM partida WHERE id = ?`;
            const parametros = [
                partida.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(parseInt(termoDePesquisa))){ 
            sql = `SELECT * FROM partida WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM partida WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        let listaPartidas = [];
        for (const registro of registros){
            const partida = new Partida(
                registro.id,
                registro.Preco,
                registro.nome,
                registro.Local_partida,
                registro.Times,
                registro.cidade,
                registro.estado,
                registro.Horario,
                registro.email
            );
            listaPartidas.push(partida);
        }
        return listaPartidas;
    }
}