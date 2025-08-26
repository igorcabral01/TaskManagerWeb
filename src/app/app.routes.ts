
import { LoginComponent } from './Login/login';
import { Routes } from '@angular/router';

import { InicioComponent } from './Inicio/inicio';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'inicio', component: InicioComponent },
];
