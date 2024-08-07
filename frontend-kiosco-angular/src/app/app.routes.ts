import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/layouts/main-layout/main-layout.component';
import { OptionsPageComponent } from './pages/options-page/options-page.component';
import { FamilySelectedPageComponent } from './components/family-selected-page/family-selected-page.component';

export const routes: Routes = [
  {
    path: '',
    component: OptionsPageComponent,
  },
  {
    path: 'products-selection',
    component: MainLayoutComponent,
    children: [{ path: 'family/:id', component: FamilySelectedPageComponent }],
  },
  { path: '**', redirectTo: '' },
];
