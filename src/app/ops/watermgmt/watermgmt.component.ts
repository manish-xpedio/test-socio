import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-watermgmt',
	templateUrl: './watermgmt.component.html',
	styleUrls: ['./watermgmt.component.css']
})

export class WatermgmtComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();

	admin_water_level_status: string = '';
	admin_water_storageList: any = [];
	admin_water_level: any = {};
	admin_water_levelList: any = [];
	admin_water_storage_connList: any = [];
	admin_water_usage: any = {};
	admin_water_usageList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'watermgmt',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.select_admin_water_level();
		this.select_admin_water_usage();
	}

	select_admin_water_level(){
		this.admin_water_level['action']='SELECT_ADMIN_WATER_LEVEL';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_water_level,
				proc: 'admin_water_levelOps'
			}
		})
		.subscribe(res => {
			this.admin_water_levelList = res['data'][0];
			if (+this.admin_water_level['sysid'] > 0){
				this.admin_water_level = this.admin_water_levelList[0];
			}
			else
				this.admin_water_level = {};
		});
	}

	select_admin_water_usage(){
		this.admin_water_usage['action']='SELECT_ADMIN_WATER_USAGE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_water_usage,
				proc: 'admin_water_usageOps'
			}
		})
		.subscribe(res => {
			this.admin_water_usageList = res['data'][0];
			if (+this.admin_water_usage['sysid'] > 0){
				this.admin_water_usage = this.admin_water_usageList[0];
			}
			else
				this.admin_water_usage = {};
		});
	}
}