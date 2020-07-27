/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/* Module */
import { ChartsModule } from './charts.module';

/* Containers */
import * as chartsContainers from './containers';

/* Guards */
import * as chartsGuards from './guards';
import { SBRouteData } from '../navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: chartsContainers.ChartsComponent,
        data: {
            title: 'SOLOSOS Restaurant',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Charts',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [ChartsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ChartsRoutingModule {}
