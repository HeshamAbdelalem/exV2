
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemPagesComponent } from './SystemPages.component';

const routes: Routes = [
    { path: '', component: SystemPagesComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SystemPagesRoutingModule {}
	 
