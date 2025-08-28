
import { LoginComponent } from './Login/login';
import { Routes } from '@angular/router';

import { InicioComponent } from './Inicio/inicio';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
];
