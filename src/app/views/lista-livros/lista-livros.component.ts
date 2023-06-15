import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  Subscription,
  debounceTime,
  filter,
  finalize,
  fromEvent,
  map,
  tap,
} from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info.model';
import { Item, Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy, AfterViewInit {
  emissorBusca: Observable<Event>;
  control: FormControl = new FormControl();
  carregando: boolean = false;
  vazio: boolean = false

  livro: Livro;
  listaLivros: Livro[];

  subscription: Subscription;

  constructor(private service: LivroService) {}

  buscarLivros(text: string) {
    this.subscription = this.service.buscar(text).pipe(finalize(()=>this.mudarCarregando(false))).subscribe({
      next: (retornoAPI) => {
        this.listaLivros = this.livroResultadoParaLivros(retornoAPI);
      },
      error: (error) => console.error(error),
    });
  }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    if (!items) {this.vazio=true; return []} else {this.vazio=false}
    return items.map((item) => new LivroVolumeInfo(item));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  mudarCarregando(estado: boolean) {
    this.carregando = estado;
  }

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(
        filter((text: string) => text.length >= 3),
        tap(()=>this.mudarCarregando(true)),
        debounceTime(1000),

      )
      .subscribe({
        next: this.buscarLivros.bind(this),
      });
  }
}
