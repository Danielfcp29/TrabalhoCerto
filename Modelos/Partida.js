import PartidaDAO from "../Persistencia/PartidaDAO.js";
export default class Partida {
    #codigo;
    #Preco;
    #nome;
    #Local_partida;
    #Times;
    #cidade;
    #estado;
    #Horario;
    #email;
    constructor(codigo=0, Preco="", nome="", Local_partida="", Times="", cidade="", estado="", Horario="", email="") {
        this.#codigo = codigo;
        this.#Preco = Preco;
        this.#nome = nome;
        this.#Local_partida = Local_partida;
        this.#Times = Times;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#Horario = Horario;
        this.#email = email;
    }
    get codigo(){
        return this.#codigo;
    }    
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }
    get Preco(){
        return this.#Preco;
    }
    set Preco(novopreco){
        this.#Preco = novopreco;
    }
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }
    get Local_partida(){
        return this.#Local_partida;
    }
    set Local_partida(novoLocal_partida){
        this.#Local_partida = novoLocal_partida;
    }
    get Times(){
        return this.#Times;
    }
    set Times(novoTimes){
        this.#Times = novoTimes;
    }
    get cidade(){
        return this.#cidade;
    }
    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }
    get estado(){
        return this.#estado;
    }
    set estado(novoEstado){
        this.#estado = novoEstado;
    }
    get Horario(){
        return this.#Horario;
    }
    set Horario(novoHorario){
        this.#Horario = novoHorario;
    }
    get email(){
        return this.#email;
    }
    set email(novoEmail){
        this.#email = novoEmail;
    }
    async gravar(){
        const dao = new PartidaDAO();
        await dao.gravar(this); 
    }
    async atualizar(){
        const dao = new PartidaDAO();
        await dao.atualizar(this);
    }
    async excluir(){
        const dao = new PartidaDAO();
        await dao.excluir(this);
    }
    async consultar(termoDePesquisa){
        const dao = new PartidaDAO();
        return await dao.consultar(termoDePesquisa);
    }
    toString(){
        return `Partida código: ${this.#codigo} -  nome: ${this.#nome}`;
    }

    toJSON(){
        return {
            "codigo": this.#codigo,
            "Preco": this.#Preco,
            "nome": this.#nome,
            "Local_partida": this.#Local_partida,
            "Times": this.#Times,
            "cidade": this.#cidade,
            "estado": this.#estado,
            "Horario": this.#Horario,
            "email": this.#email
        }
    }
}