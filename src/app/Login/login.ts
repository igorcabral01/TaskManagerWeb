
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  onLogin() {
    this.error = '';
    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: (res) => {
        if (res && res.token) {
          this.authService.setToken(res.token);
          this.router.navigate(['/inicio']);
        } else {
          this.error = 'Login falhou: token não recebido.';
        }
      },
      error: () => {
        this.error = 'Credenciais inválidas ou erro de conexão.';
      }
    });
  }
}
