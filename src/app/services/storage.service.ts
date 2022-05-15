import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor(private storage: Storage, private datepipe: DatePipe) {
    //Chamada para a criação do Banco
    this.createDB();
  }

  //Criando um Banco de dados no Storage
  async createDB() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  //Inserção de um registro, usa o plugin datepipe para formatar a data
  public insert(produto: Produto) {
    const key = this.datepipe.transform(new Date(), 'ddMMyyyyHHmmss');
    return this.save(key, produto);
  }

  //Método para edição de um produto, ele chamará o método save passando a chave do registro e a tarefa que será alterada
  public update(key: string, produto: Produto) {
    return this.save(key, produto);
  }

  //Excluir um registro
  public remove(key: string) {
    return this.storage.remove(key);
  }

  //Selecionar todos os registros
  public getAll() {
    const produtos: ProdutoLista[] = [];
    return this.storage.forEach((value: Produto, key: string, iterationNumber: number) => {
      const produto = new ProdutoLista();
      produto.key = key;
      produto.produto = value;
      produtos.push(produto);
    })
      .then(() => Promise.resolve(produtos))
      .catch((error) => Promise.reject(error));
  }

  //Método para setar valores na chave do storage
  private save(key: string, produto: Produto) {
    return this.storage.set(key, produto);
  }

}

// A classe produto tem os atributos de um produto
export class Produto {
  nome: string;
  quantidade: number;
  marcado: boolean;
}

//A classe produto lista terá a chave do storage e o objeto Produto com todos os campos
export class ProdutoLista {
  key: string;
  produto: Produto;
}
