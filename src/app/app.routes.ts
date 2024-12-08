import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';

import { HomeComponent } from './components/home/home.component';
import { EditarPerfumeComponent } from './components/editar-perfume/editar-perfume.component';
import { CrearPerfumeComponent } from './components/crear-perfume/crear-perfume.component';
import { PerfilComponent } from './components/perfil/perfil.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'recovery', component: RecoveryComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'home', component:  HomeComponent},
    { path: 'editar-perfume/:id', component: EditarPerfumeComponent},
    { path: 'crear-perfume', component: CrearPerfumeComponent},
    { path: 'perfil', component: PerfilComponent}
];
