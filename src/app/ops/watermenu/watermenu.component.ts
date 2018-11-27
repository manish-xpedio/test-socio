import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-watermenu',
	templateUrl: './watermenu.component.html',
	styleUrls: ['./watermenu.component.css']
})

export class WatermenuComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	side_menu_list: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'watermenu',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.side_menu_list = this.ds.getSidemenus(345);
	}

}