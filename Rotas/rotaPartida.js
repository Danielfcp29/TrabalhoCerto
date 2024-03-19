//Rota é uma micro aplicação express que se encarrega de processar
//requisições em um determinado endpoint
//Por exemplo: http://localhost:3000/partida  <-- partida é um endpoint
//            domínio da aplicação   endpoint 

import { Router } from 'express';
import PartidaCtrl from '../Controles/partidaCtrl.js';

const rotaPartida = new Router();
const cliCtrl = new PartidaCtrl();

rotaPartida
.get('/', cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)
.post('/', cliCtrl.gravar)
.put('/:codigo', cliCtrl.atualizar)
.patch('/:codigo', cliCtrl.atualizar)
.delete('/:codigo', cliCtrl.excluir);


export default rotaPartida;