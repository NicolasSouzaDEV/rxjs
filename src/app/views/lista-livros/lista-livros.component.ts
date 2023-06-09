import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info.model';
import { Item, Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  campoBusca: string = '';

  livro: Livro;
  listaLivros: Livro[];

  subscription: Subscription;

  constructor(private service: LivroService) {}

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (retornoAPI) => {
        this.listaLivros = this.livroResultadoParaLivros(retornoAPI);
      },
      error: (error) => console.error(error),
    });
  }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
