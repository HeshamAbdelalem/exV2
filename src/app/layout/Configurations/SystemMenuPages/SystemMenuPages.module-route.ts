
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemMenuPagesComponent } from './SystemMenuPages.component';

const routes: Routes = [
    { path: '', component: SystemMenuPagesComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SystemMenuPagesRoutingModule {}
	 
