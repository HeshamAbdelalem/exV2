
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingsComponent } from './SystemSettings.component'; import { SystemSettingComponent } from './SystemSetting.component';

const routes: Routes = [
    { path: '', component: SystemSettingComponent }
    // , 
    // { path: ':id', component: SystemSettingComponent } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SystemSettingsRoutingModule { }

