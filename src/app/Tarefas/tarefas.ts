import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, FormsModule],
  templateUrl: './tarefas.html',
  styleUrls: ['./tarefas.css']
})
export class TarefasComponent {
  tarefas = [
    { titulo: 'Estudar Angular', descricao: 'Aprofundar em Angular Material' },
    { titulo: 'Criar tela de login', descricao: 'Implementar autenticação' }
  ];

  novaTarefa = { titulo: '', descricao: '' };

  adicionarTarefa() {
    if (this.novaTarefa.titulo && this.novaTarefa.descricao) {
      this.tarefas.push({ ...this.novaTarefa });
      this.novaTarefa = { titulo: '', descricao: '' };
    }
  }
}
