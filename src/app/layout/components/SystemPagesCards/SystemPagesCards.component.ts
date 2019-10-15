import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SystemMenuService } from '../../../services/Configurations/SystemMenu.service';
import { SystemMenuPageService } from '../../../services/Configurations/SystemMenuPage.service';

@Component({
	selector: 'app-systempagecards',
	templateUrl: './SystemPagesCards.component.html',
	styleUrls: ['./SystemPagesCards.component.scss']
})

export class SystemPagesCardsComponent implements OnInit {

	Pages: any;
	MenuName: any;
	Menus: any[];
	MyMenu: any;
	MenuPages: any;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _SystemMenuService: SystemMenuService,
		private _SystemMenuPageService: SystemMenuPageService
	) { }

	ngOnInit() {
		
		this.Pages = [];

		this._SystemMenuService.Get().subscribe(menus => {
			this.Menus = menus;

			this.route.params.subscribe((params: Params) => {

				const MenuCode: string = params.code as string;
				
				this.MyMenu = this.Menus.filter(menu => {
					return menu.Code === MenuCode;
				});

				if (this.MyMenu) {
					this.MyMenu = this.MyMenu[0];
				}
				
				let SystemMenuPage: any = {};
				SystemMenuPage.PageSize = 1000;
				SystemMenuPage.SystemMenuID = this.MyMenu.ID;
				this._SystemMenuPageService.GetSystemMenuPagePage(SystemMenuPage).subscribe(menuPages => {
					this.MenuPages = menuPages.Data;

					if (this.MenuPages) {
						
						this.Pages = [];
						
						this.MenuPages = this.MenuPages.sort(function(a, b) {
							return a.Serial - b.Serial;
						});

						this.MenuPages.forEach(menuPage => {
							this.Pages.push(menuPage.SystemPage);
						});

					}
				});
		
			});
		});

		


	}

	goto(page) {
		this.router.navigate([`${page.Code}`]);
	}



} // the end :)

