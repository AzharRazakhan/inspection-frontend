import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Parameters } from './components/parameters/parameters';
import { Specification } from './components/specification/specification';
import { Plan } from './components/plan/plan';
import { Inspection } from './components/inspection/inspection';
import { Login } from './auth/login/login';
import { authGuardGuard } from './auth/auth-guard-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuardGuard] },
    { path: 'products', component: Products, canActivate: [authGuardGuard] },
    { path: 'parameters', component: Parameters, canActivate: [authGuardGuard] },
    { path: 'specification', component: Specification, canActivate: [authGuardGuard] },
    { path: 'plan', component: Plan, canActivate: [authGuardGuard] },
    { path: 'inspection', component: Inspection, canActivate: [authGuardGuard] },
    { path: 'login', component: Login }
];
