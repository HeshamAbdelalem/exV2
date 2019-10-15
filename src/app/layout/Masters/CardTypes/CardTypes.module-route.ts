
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardTypesComponent } from './CardTypes.component';

const routes: Routes = [
    { path: '', component: CardTypesComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CardTypesRoutingModule {}
	 
