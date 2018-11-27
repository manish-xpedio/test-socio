import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-memprofile',
	templateUrl: './memprofile.component.html',
	styleUrls: ['./memprofile.component.css']
})

export class MemprofileComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	
	crm_members: any = {};
	crm_membersList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'memprofile',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
	}

}