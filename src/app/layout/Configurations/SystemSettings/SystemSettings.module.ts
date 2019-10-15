
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingsRoutingModule } from './SystemSettings.module-route';
import { SystemSettingsComponent } from './SystemSettings.component';

import { SystemSettingComponent } from './SystemSetting.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../common/mat-components';
import { ToolbarModule } from '../../../common/components/toolbar/toolbar.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountService } from '../../../services/GeneralLedger/Account.service';
import { CurrencyService } from '../../../services/Masters/Currency.service';
import { SystemSettingService } from '../../../services/Configurations/SystemSetting.service';
import { XStaticAccountService } from '../../../services/Lookups/XStaticAccount.service';
import { StaticAccountService } from '../../../services/Configurations/StaticAccount.service';
import { CommissionAccountService } from '../../../services/Configurations/CommissionAccount.service';

@NgModule({
  declarations: [
    SystemSettingComponent,
    SystemSettingsComponent
  ],
  imports: [
    CommonModule,
    SystemSettingsRoutingModule,

    ToolbarModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
	AccountService,
CurrencyService,
SystemSettingService,
XStaticAccountService,
StaticAccountService,
CommissionAccountService,

  ]
})
export class SystemSettingsModule { }

