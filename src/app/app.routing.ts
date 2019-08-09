import{ModuleWithProviders} from "@angular/core"
import{ Routes, RouterModule} from "@angular/router" 
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PartidoComponent } from './components/partido/partido.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

const appRoutes: Routes =[ 
    {path: '', component: HomeComponent},
    {path: '',redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'partido', component: PartidoComponent},
    {path: 'resultado', component: ResultadosComponent},
]

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 