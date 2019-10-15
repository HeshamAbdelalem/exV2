
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardIssuersComponent } from './CardIssuers.component';

const routes: Routes = [
    { path: '', component: CardIssuersComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CardIssuersRoutingModule {}
	 
