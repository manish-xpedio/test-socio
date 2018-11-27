import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	constructor( private ds: DataService, private route: ActivatedRoute ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'settings',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
	}

}