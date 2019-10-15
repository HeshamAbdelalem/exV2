import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MastersRoutingModule } from './Masters.module-routes';
import { MastersComponent } from './Masters.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        MastersRoutingModule,
        TranslateModule
    ],
    declarations: [
        MastersComponent,
    ]
    // ,
    // exports: [
    //     MastersComponent
    // ]
    ,
    providers: []
})
export class MastersModule { }
