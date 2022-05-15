import { Component } from '@angular/core';
import { StorageService, ProdutoLista } from '../services/storage.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Produto } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {

  produto: Produto;
  produtos: ProdutoLista[];
  key: string;

  constructor(public navCtrl: NavController,
    private router: Router,
    private storageService: StorageService,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.produto = new Produto();
  }

  // método ionWiewDidEnter carrega todos os registros do storage quando o usuário entra na página
  //saiba mais sobre o ciclo de vida das páginas no link: https://ionicframework.com/docs/angular/lifecycle
  ionViewDidEnter() {
    this.storageService.getAll()
      .then((result) => {
        this.produtos = result;
      });
  }

  // chama a página edita-produto passando um objeto produto como parâmetro
  editaProduto(item: ProdutoLista) {
    const navExtras = {
      state: {
        valorParaEnviar: { key: item.key, produto: item.produto }
      }
    };
    this.router.navigate(['edita-produto'], navExtras);
  }

  marcaProduto(item: ProdutoLista){
    if (item.produto.marcado) {
      item.produto.marcado = false;
      this.editarProduto();
    } else {
      item.produto.marcado = true;
      this.editarProduto();
    }
  }

  // chama o método remove do Storage service passando a chave para ser excluída
  removeProduto(item: ProdutoLista) {
    this.storageService.remove(item.key)
      .then(async () => {
        // Removendo do array de items
        const index = this.produtos.indexOf(item);
        this.produtos.splice(index, 1);
        (await this.toastCtrl.create({ message: 'Produto removido.', duration: 3000, position: 'bottom' })).present();
      });
  }

  // Chama o método salvaProduto exibindo um toast se houver erro ou sucesso.
  // https://ionicframework.com/docs/native/toast;
  save() {
    if (this.produto.nome == null) {
      this.exibeAlert('Informe o item');
    } else if (this.produto.quantidade == null) {
      this.exibeAlert('Informe a quantidade a ser comprada');
    } else {
      this.salvarProduto()
      .then(async () => {
        this.exibeToast('Produto salvo');
      })
      .catch(async () => {
        this.exibeToast('Erro ao salvar produto');
      });
      this.produto = new Produto();
    }
  }

  async exibeAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async exibeToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // chama o método insert do Service Storage
  private salvarProduto() {
      return this.storageService.insert(this.produto);
  }

    // chama o método update do Service Storage
    private editarProduto() {
      return this.storageService.update(this.key, this.produto);
  }

}
