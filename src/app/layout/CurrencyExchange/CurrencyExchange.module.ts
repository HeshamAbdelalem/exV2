import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CurrencyExchangeRoutingModule } from './CurrencyExchange.module-routes';
import { CurrencyExchangeComponent } from './CurrencyExchange.component';

import { TranslateModule } from '@ngx-translate/core';

// import { MaterialModule } from '../../common/mat-components';

@NgModule({
    imports: [
        CommonModule,
        CurrencyExchangeRoutingModule,
        // MaterialModule,
        TranslateModule
    ],
    declarations: [
        CurrencyExchangeComponent,
    ],
    providers: []
})
export class CurrencyExchangeModule { }
