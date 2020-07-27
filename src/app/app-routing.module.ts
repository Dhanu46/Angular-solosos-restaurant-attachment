

import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../modules/login/login.component';
import { RestaurantComponent } from '../modules/restaurant/restaurant.component';
import { AdminPanelComponent } from 'src/modules/admin-panel/admin-panel.component';




const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"addRestaurant",component:RestaurantComponent},
  {
    path: 'charts',
    loadChildren: () =>
        import('../modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
},
{
    path: 'admin',
    loadChildren: () =>
        import('../modules/dashboard/dashboard-routing.module').then(
            m => m.DashboardRoutingModule
        ),
},
{
    path: 'auth',
    loadChildren: () =>
        import('../modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
},
{
    path: 'error',
    loadChildren: () =>
        import('../modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
},
{
    path: 'tables',
    loadChildren: () =>
        import('../modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
},
{
    path: 'version',
    loadChildren: () =>
        import('../modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
},
{
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
        import('../modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
