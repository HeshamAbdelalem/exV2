import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MoneyTransferRoutingModule } from './MoneyTransfer.module-routes';
import { MoneyTransferComponent } from './MoneyTransfer.component';

import { TranslateModule } from '@ngx-translate/core';

// import { MaterialModule } from '../../common/mat-components';

@NgModule({
    imports: [
        CommonModule,
        MoneyTransferRoutingModule,
        // MaterialModule,
        TranslateModule
    ],
    declarations: [
        MoneyTransferComponent,
    ],
    providers: []
})
export class MoneyTransferModule { }
