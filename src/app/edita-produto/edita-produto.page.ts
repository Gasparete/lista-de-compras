import { Component, OnInit } from '@angular/core';
import { StorageService, Produto } from '../services/storage.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edita-produto',
  templateUrl: './edita-produto.page.html',
  styleUrls: ['./edita-produto.page.scss'],
})

export class EditaProdutoPage implements OnInit {
  model: Produto;
  key: string;
  parametros: any;
  constructor(public navCtrl: NavController,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastController) { }

  // método ngOnInit carregará o formulário vazio ou com os dados para alteração
  // se existir um objeto na url, carrega com os dados do objeto senão carrega o formulário para inclusão
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.key = getNav.extras.state.valorParaEnviar.key;
        this.model = getNav.extras.state.valorParaEnviar.produto;
      } else {
        this.model = new Produto();
      }
    });
  }

  // Chama o método salvaProduto exibindo um toast se houver erro ou sucesso.
  // https://ionicframework.com/docs/native/toast;
  save() {
    this.salvarProduto()
      .then(async () => {
        (await this.toast.create({ message: 'Produto salvo.', duration: 3000, position: 'bottom' })).present();
        this.navCtrl.pop();
      })
      .catch(async () => {
        (await this.toast.create({ message: 'Erro ao salvar produto.', duration: 3000, position: 'bottom' })).present();
      });
  }

  // se já existir uma key chama o método update, senão chama o método insert do Service Storage
  private salvarProduto() {
    if (this.key) {
      return this.storageService.update(this.key, this.model);
    } else {
      return this.storageService.insert(this.model);
    }
  }

}
