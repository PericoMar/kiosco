import { Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/layouts/main-layout/main-layout.component';
import { OptionsPageComponent } from './pages/options-page/options-page.component';
import { FamilySelectedPageComponent } from './components/family-selected-page/family-selected-page.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ConfirmPageComponent } from './pages/confirm-page/confirm-page.component';
import { InactivePageComponent } from './pages/inactive-page/inactive-page.component';
import { ManagementPanelComponent } from './pages/layouts/management-panel/management-panel.component';
import { ProductsManagerComponent } from './pages/layouts/management-panel/products-manager/products-manager.component';
import { FamiliesManagerComponent } from './pages/layouts/management-panel/families-manager/families-manager.component';
import { SalesManagerComponent } from './pages/layouts/management-panel/sales-manager/sales-manager.component';
import { DevicesManagerComponent } from './pages/layouts/management-panel/devices-manager/devices-manager.component';
import { OverviewComponent } from './pages/layouts/management-panel/overview/overview.component';
import { LoginComponent } from './pages/layouts/management-panel/login/login.component';
import { authGuard } from './guards/auth.guard';
import { KioscoLayoutComponent } from './pages/layouts/kiosco-layout/kiosco-layout.component';

export const routes: Routes = [
  {
    path: 'kiosco/:numSerieKiosco',
    component: KioscoLayoutComponent,
    children: [
      {
        path: '',
        component: OptionsPageComponent,
      },
      {
        path: 'products-selection',
        component: MainLayoutComponent,
        children: [{ path: 'family/:id', component: FamilySelectedPageComponent }],
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'confirm-page',
        component: ConfirmPageComponent,
      },
      {
        path: 'inactive',
        component: InactivePageComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'management-panel',
    component: ManagementPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: OverviewComponent },
      { path: 'products', component: ProductsManagerComponent },
      { path: 'families', component: FamiliesManagerComponent },
      { path: 'sales', component: SalesManagerComponent },
      { path: 'devices', component: DevicesManagerComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

