/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';
import { SBRouteData } from '../navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'SOLOSOS Restaurant',
            breadcrumbs: [
                {
                    text: 'Admin Panel',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'static',
        data: {
            title: 'SOLOSOS Restaurant',
            breadcrumbs: [
                {
                    text: 'Admin Panel',
                    link: '/admin',
                },
                {
                    text: 'Static',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.StaticComponent,
    },
    {
        path: 'light',
        data: {
            title: 'SOLOSOS Restaurant',
            breadcrumbs: [
                {
                    text: 'Admin Panel',
                    link: '/light',
                },
                {
                    text: 'Light',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.LightComponent,
    },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
