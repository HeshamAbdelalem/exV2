import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './Configurations.component';

const routes: Routes = [
    {
        path: '',
        component: ConfigurationsComponent,
        children: [
            {
                path: '',
                redirectTo: 'SystemMenus'
            }, 
            {
                path: 'SystemMenus',
                loadChildren: './SystemMenus/SystemMenus.module#SystemMenusModule'
            }, 
            {
                path: 'SystemPages',
                loadChildren: './SystemPages/SystemPages.module#SystemPagesModule'
            }, 
            {
                path: 'SystemMenuPages',
                loadChildren: './SystemMenuPages/SystemMenuPages.module#SystemMenuPagesModule'
            }, 
            {
                path: 'BankAccounts',
                loadChildren: './BankAccounts/BankAccounts.module#BankAccountsModule'
            }
            , 
            {
                path: 'SystemSettings',
                loadChildren: './SystemSettings/SystemSettings.module#SystemSettingsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationsRoutingModule {}
