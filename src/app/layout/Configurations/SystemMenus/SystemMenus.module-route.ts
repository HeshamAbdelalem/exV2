
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemMenusComponent } from './SystemMenus.component';

const routes: Routes = [
    { path: '', component: SystemMenusComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SystemMenusRoutingModule {}
	 
