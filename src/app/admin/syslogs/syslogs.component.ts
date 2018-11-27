import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-syslogs',
	templateUrl: './syslogs.component.html',
	styleUrls: ['./syslogs.component.css']
})

export class SyslogsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_syslogs_status: string = '';
	admin_syslogs: any = {};
	admin_syslogsList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'syslogs',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.select_admin_syslogs();
		this.admin_syslogsList = ['1','2','3'];
	}

	select_admin_syslogs(){
		this.admin_syslogs['action']='SELECT_ADMIN_SYSLOGS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_syslogs,
				proc: 'admin_syslogsOps'
			}
		})
		.subscribe(res => {
			console.log(res['data'][0]);
			this.admin_syslogsList = res['data'][0];
		})
	}
}