import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  template: `
    <h2 mat-dialog-title>Criar Tarefa</h2>
    <form (ngSubmit)="criarTarefa()" #form="ngForm" class="tarefa-form-modal">
      
      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Título</mat-label>
        <input matInput name="titulo" [(ngModel)]="tarefaForm.titulo" required />
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Descrição</mat-label>
        <textarea matInput name="descricao" [(ngModel)]="tarefaForm.descricao"></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Status</mat-label>
        <mat-select name="status" [(ngModel)]="tarefaForm.status" required>
          <mat-option [value]="1">To Do</mat-option>
          <mat-option [value]="2">In Progress</mat-option>
          <mat-option [value]="3">Review</mat-option>
          <mat-option [value]="4">Done</mat-option>
          <mat-option [value]="5">Cancelled</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Prioridade</mat-label>
        <mat-select name="prioridade" [(ngModel)]="tarefaForm.prioridade">
          <mat-option [value]="1">Low</mat-option>
          <mat-option [value]="2">Medium</mat-option>
          <mat-option [value]="3">High</mat-option>
          <mat-option [value]="4">Critical</mat-option>
        </mat-select>
      </mat-form-field>


      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Projeto</mat-label>
        <mat-select name="projetoId" [(ngModel)]="tarefaForm.projetoId" required>
          <mat-option *ngFor="let p of projetos" [value]="p.id">{{ p.nome }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Criada Por</mat-label>
        <mat-select name="criadaPorId" [(ngModel)]="tarefaForm.criadaPorId" required>
          <mat-option *ngFor="let u of usuarios" [value]="u.id">{{ u.nome }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Atribuída Para</mat-label>
        <mat-select name="atribuidaParaId" [(ngModel)]="tarefaForm.atribuidaParaId">
          <mat-option *ngFor="let u of usuarios" [value]="u.id">{{ u.nome }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Horas Estimadas</mat-label>
        <input matInput type="number" name="horasEstimadas" [(ngModel)]="tarefaForm.horasEstimadas" />
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Horas Reais</mat-label>
        <input matInput type="number" name="horasReais" [(ngModel)]="tarefaForm.horasReais" />
      </mat-form-field>

      <mat-form-field appearance="fill" class="tarefa-field">
        <mat-label>Observações</mat-label>
        <textarea matInput name="observacoes" [(ngModel)]="tarefaForm.observacoes"></textarea>
      </mat-form-field>

      <div class="botoes">
        <button mat-raised-button color="primary" type="submit" [disabled]="criando">Criar</button>
        <button mat-stroked-button mat-dialog-close type="button">Cancelar</button>
      </div>

      <span *ngIf="mensagem" class="mensagem">{{ mensagem }}</span>
    </form>
  `,
  styles: [`
    .tarefa-form-modal {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .tarefa-field {
      flex: 1 1 220px;
      min-width: 220px;
    }
    .botoes {
      display: flex;
      gap: 10px;
      margin-top: 12px;
    }
    .mensagem {
      margin-left: 12px;
      color: #1976d2;
    }
    ::ng-deep .mat-mdc-form-field-label {
      font-size: 12px; /* menor label */
    }
    ::ng-deep .mat-mdc-text-field-wrapper {
      border-radius: 4px !important; /* mais retangular */
    }
  `]
})
export class TarefaFormComponent {
  tarefaForm = {
    titulo: '',
    descricao: '',
    status: 1,
    prioridade: 1,
    dataVencimento: '',
    dataConclusao: '',
    projetoId: '',
    atribuidaParaId: '',
    criadaPorId: '',
    horasEstimadas: '',
    horasReais: '',
    observacoes: ''
  };

  criando = false;
  mensagem = '';
  usuarios: Array<{ id: string, nome: string }> = [];
  projetos: Array<{ id: string, nome: string }> = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:5105/api/usuario').subscribe({
      next: (res) => {
        this.usuarios = res.map(u => ({
          id: u.usuarioId,
          nome: u.primeiroNome
        }));
      }
    });

    this.http.get<any[]>('http://localhost:5105/api/projeto').subscribe({
      next: (res) => {
        this.projetos = res.map(p => ({
          id: p.projetoId,
          nome: p.nome
        }));
      }
    });
  }

  criarTarefa() {
    this.criando = true;
    this.mensagem = '';

    const payload = {
      ...this.tarefaForm,
      dataVencimento: this.tarefaForm.dataVencimento ? new Date(this.tarefaForm.dataVencimento).toISOString() : null,
      dataConclusao: this.tarefaForm.dataConclusao ? new Date(this.tarefaForm.dataConclusao).toISOString() : null
    };

    console.log('Payload enviado para criação de tarefa:', payload);

    this.http.post('http://localhost:5105/api/tarefa', payload).subscribe({
      next: () => {
        this.mensagem = 'Tarefa criada com sucesso!';
        this.criando = false;
        this.tarefaForm = {
          titulo: '',
          descricao: '',
          status: 1,
          prioridade: 1,
          dataVencimento: '',
          dataConclusao: '',
          projetoId: '',
          atribuidaParaId: '',
          criadaPorId: '',
          horasEstimadas: '',
          horasReais: '',
          observacoes: ''
        };
      },
      error: () => {
        this.mensagem = 'Erro ao criar tarefa.';
        this.criando = false;
      }
    });
  }
}
