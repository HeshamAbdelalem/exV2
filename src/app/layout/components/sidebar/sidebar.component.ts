import { Component, OnInit } from '@angular/core';
import { SystemMenuService } from '../../../services/Configurations/SystemMenu.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers:[
        SystemMenuService
    ]
})
export class SidebarComponent implements OnInit {
    
    public showMenu: string;
    public Menus = [];
    public Pages = [];
    public UserName: string;
    public logoUrl: string;

    constructor(    private _SystemMenuService: SystemMenuService
        ) {}

    ngOnInit() {
        this.showMenu = '';
        this._SystemMenuService.Get().subscribe(res => {
            this.Menus = res;
      
            this.Menus = this.Menus.sort(function(a, b) {
              return a.Serial - b.Serial;
            });
          });
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
