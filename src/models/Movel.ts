export class Movel {
    public idMovel?: number;
    public Usuario_idUsuario: number;
    public nome: string;
    public preco: number;
    public estado: string;
    public descricao: string;
    public urlImagem?: string;
  
    constructor(
      Usuario_idUsuario: number,
      nome: string,
      preco: number,
      estado: string,
      descricao: string,
      urlImagem?: string,
      idMovel?: number
    ) {
      this.Usuario_idUsuario = Usuario_idUsuario;
      this.nome = nome;
      this.preco = preco;
      this.estado = estado;
      this.descricao = descricao;
      this.urlImagem = urlImagem;
      this.idMovel = idMovel;
    }
}