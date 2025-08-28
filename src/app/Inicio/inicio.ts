import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TarefaFormComponent } from './tarefa-form.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatSidenavModule, MatToolbarModule, MatListModule, CommonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule,
    MatDialogModule, TarefaFormComponent
  ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent {
  tarefaForm = {
    titulo: '',
    descricao: '',
    status: '',
    prioridade: '',
    dataVencimento: '',
    dataConclusao: '',
    projetoId: '',
    atribuidaParaId: '',
    criadaPorId: '',
    horasEstimadas: '',
    horasReais: '',
    observacoes: ''
  };
  criando: boolean = false;
  mensagem: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  abrirModalTarefa() {
    this.dialog.open(TarefaFormComponent, {
      width: '600px',
      disableClose: false
    });
  }

  criarTarefa() {
    this.criando = true;
    this.mensagem = '';
    const payload = {
      ...this.tarefaForm,
      dataVencimento: this.tarefaForm.dataVencimento ? new Date(this.tarefaForm.dataVencimento) : null,
      dataConclusao: this.tarefaForm.dataConclusao ? new Date(this.tarefaForm.dataConclusao) : null
    };
    this.http.post('http://localhost:5105/api/tarefa', payload).subscribe({
      next: () => {
        this.mensagem = 'Tarefa criada com sucesso!';
        this.criando = false;
        this.tarefaForm = {
          titulo: '', descricao: '', status: '', prioridade: '', dataVencimento: '', dataConclusao: '', projetoId: '', atribuidaParaId: '', criadaPorId: '', horasEstimadas: '', horasReais: '', observacoes: ''
        };
      },
      error: () => {
        this.mensagem = 'Erro ao criar tarefa.';
        this.criando = false;
      }
    });
  }
  get acessoNegado(): boolean {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('jwtToken');
    }
    return false;
  }

  tarefas = [
    { nome: 'Finalizar layout do dashboard', projeto: 'TaskManager', status: 'Pendente' },
    { nome: 'Corrigir autenticação JWT', projeto: 'TaskManager', status: 'Em andamento' },
    { nome: 'Reunião com equipe', projeto: 'Projetos', status: 'Concluída' },
  ];
  projetos = [
    { nome: 'TaskManager', descricao: 'Gerenciador de tarefas e projetos' },
    { nome: 'Projetos', descricao: 'Gestão de projetos internos' },
  ];
}
