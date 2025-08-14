import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }  // Update to 'admin-dashboard'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
