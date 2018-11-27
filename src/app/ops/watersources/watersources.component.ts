import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-watersources',
	templateUrl: './watersources.component.html',
	styleUrls: ['./watersources.component.css']
})

export class WatersourcesComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	admin_water_sources_status: string = '';
	admin_water_sources: any = {};
	admin_water_sourcesList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'watersources',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.admin_water_sources['sysid'] = params.id;
		});
		this.ref_select();
		this.select_admin_water_sources();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_water_sourcesOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_water_sources(){
		this.admin_water_sources['action']='SELECT_ADMIN_WATER_SOURCES';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_water_sources,
				proc: 'admin_water_sourcesOps'
			}
		})
		.subscribe(res => {
			this.admin_water_sourcesList = res['data'][0];
			if (+this.admin_water_sources['sysid'] > 0){
				this.admin_water_sources = this.admin_water_sourcesList[0];
			}
			else
				this.admin_water_sources = {};
		});
	}

	save_admin_water_sources(frm){
		if (!frm.form.valid){
			this.admin_water_sources_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_water_sources['action']='SAVE_ADMIN_WATER_SOURCES';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_water_sources,
				proc: 'admin_water_sourcesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_water_sources_status = res['data'][0][0].msg;
				this.admin_water_sources = {};
				this.select_admin_water_sources();
			}
			else
				this.admin_water_sources_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_water_sources(sysid){
		this.admin_water_sources['action']='DELETE_ADMIN_WATER_SOURCES';
		this.admin_water_sources['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_water_sources,
				proc: 'admin_water_sourcesOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_water_sources_status = res['data'][0][0].msg;
				this.admin_water_sources = {};
				this.select_admin_water_sources();
			}
			else
				this.admin_water_sources_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_water_sources(rec){
		this.admin_water_sources = rec;
		this.admin_water_sources_status = '';
	}

	clear_admin_water_sources(){
		this.admin_water_sources = {};
		this.admin_water_sources_status = '';
	}

}