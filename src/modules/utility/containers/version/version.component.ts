import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';
import { UtilityService } from '../../services';

@Component({
    selector: 'sb-version',
    templateUrl: './version.component.html',
    styleUrls: ['version.component.scss'],
})
export class VersionComponent implements OnInit {
    version!: string;
    constructor(private utilityService: UtilityService) {}
    ngOnInit() {
        this.utilityService.version$.pipe(take(1)).subscribe(v => (this.version = v));
    }
}
