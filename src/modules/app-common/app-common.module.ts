import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* tslint:disable: ordered-imports*/

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Third Party */


import { IconsModule } from '../icons/icons.module';

const thirdParty = [IconsModule, NgbModule];

/* Containers */
import * as appCommonContainers from './containers';

/* Components */
import * as appCommonComponents from './components';

/* Guards */
import * as appCommonGuards from './guards';

/* Services */
import * as appCommonServices from './services';
import * as authServices from '../auth/services';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, RouterModule, ...thirdParty],
    providers: [...appCommonServices.services, ...authServices.services, ...appCommonGuards.guards],
    declarations: [...appCommonContainers.containers, ...appCommonComponents.components],
    exports: [...appCommonContainers.containers, ...appCommonComponents.components, ...thirdParty],
})
export class AppCommonModule {}
