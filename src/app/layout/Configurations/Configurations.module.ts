import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfigurationsRoutingModule } from './Configurations.module-routes';
import { ConfigurationsComponent } from './Configurations.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ConfigurationsRoutingModule,
        TranslateModule
    ],
    declarations: [
        ConfigurationsComponent,
    ],
    providers: []
})
export class ConfigurationsModule { }
