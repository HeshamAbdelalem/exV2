import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  @Input() SaveButton: boolean = false;
  @Input() UpdateButton: boolean = false;
  @Input() DeleteButton: boolean = false;
  @Input() NewButton: boolean = false;
  @Input() RefreshButton: boolean = false;
  @Input() BackButton: boolean = false;
  @Input() PrintButton: boolean = false;
  
  @Input() SearchButton: boolean = false;
  @Input() ClearButton: boolean = false;
  @Input() AddNewButton: boolean = false;

  @Input() BackTo: string = '';
  @Input() AddNewRoute: string = '';
  
  @Output() OnNew = new EventEmitter();
  @Output() OnSave = new EventEmitter();
  @Output() OnUpdate = new EventEmitter();
  @Output() OnDelete = new EventEmitter();
  @Output() OnRefresh = new EventEmitter();
  @Output() OnPrint = new EventEmitter();
  
  @Output() OnSearch = new EventEmitter();
  @Output() OnClear = new EventEmitter();

  constructor(
		private router: Router,
  ) { }

  ngOnInit() {
  }

  onNew() { this.OnNew.emit({ EventTime: new Date() }); }
  onSave() { this.OnSave.emit({ EventTime: new Date() }); }
  onUpdate() { this.OnUpdate.emit({ EventTime: new Date() }); }
  onDelete() { this.OnDelete.emit({ EventTime: new Date() }); }
  onRefresh() { this.OnRefresh.emit({ EventTime: new Date() }); }
  onSearch() {this.OnSearch.emit({ EventTime: new Date() }); }
  onClear() {this.OnClear.emit({ EventTime: new Date() }); }
  onPrint(_ReportOutput: any) {this.OnPrint.emit({ ReportOutput: _ReportOutput }); }

  goToList() {
		this.router.navigate([this.BackTo]);
  }

  goToDetail() {
		this.router.navigate([this.AddNewRoute]);
  }

	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	}

}
