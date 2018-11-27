import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-wings',
	templateUrl: './wings.component.html',
	styleUrls: ['./wings.component.css']
})

export class WingsComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	admin_wings_status: string = '';
	admin_wings: any = {};
	admin_wingsList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'wings',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
				this.admin_wings['sysid'] = params.id;
			});

		this.ref_select();
		this.select_admin_wings();
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_wingsOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_wings(){
		this.admin_wings['action']='SELECT_ADMIN_WINGS';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_wings,
				proc: 'admin_wingsOps'
			}
		})
		.subscribe(res => {
			this.admin_wingsList = res['data'][0];
			if (+this.admin_wings['sysid'] > 0){

				this.admin_wings = this.admin_wingsList[0];
			}
			else
				this.admin_wings = {};
		});
	}

	save_admin_wings(frm){
		if (!frm.form.valid){
			this.admin_wings_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_wings['action']='SAVE_ADMIN_WINGS';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_wings,
				proc: 'admin_wingsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_wings_status = res['data'][0][0].msg;
				this.admin_wings = {};
				this.select_admin_wings();
			}
			else
				this.admin_wings_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_wings(sysid){
		this.admin_wings['action']='DELETE_ADMIN_WINGS';
		this.admin_wings['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_wings,
				proc: 'admin_wingsOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_wings_status = res['data'][0][0].msg;
				this.admin_wings = {};
				this.select_admin_wings();
			}
			else
				this.admin_wings_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_wings(rec){
		this.admin_wings = rec;
		this.admin_wings_status = '';
	}

	clear_admin_wings(){
		this.admin_wings = {};
		this.admin_wings_status = '';
	}

}