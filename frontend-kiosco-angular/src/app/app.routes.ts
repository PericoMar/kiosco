import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/layouts/main-layout/main-layout.component';
import { OptionsPageComponent } from './pages/options-page/options-page.component';

export const routes: Routes = [
    {
        path: '',
        component: OptionsPageComponent,
    },
    {
    path: 'products-selection',
    component: MainLayoutComponent,
    children: [
        // { path: '', component: ProductOperationsComponent, canActivate: [authGuard] },
    ]
    },
    { path: '**', redirectTo: 'l' },
];