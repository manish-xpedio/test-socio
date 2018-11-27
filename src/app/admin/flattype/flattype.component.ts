import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-flattype',
	templateUrl: './flattype.component.html',
	styleUrls: ['./flattype.component.css']
})

export class FlattypeComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	admin_flat_type_status: string = '';
	admin_flat_type: any = {};
	admin_flat_typeList: any = [];


	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'flattype',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);

		this.route.queryParams
			.subscribe(params => {
				this.admin_flat_type['sysid'] = params.id;
			});

		this.ref_select();
		this.select_admin_flat_type();
	}

	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'admin_flat_typeOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_admin_flat_type(){
		this.admin_flat_type['action']='SELECT_ADMIN_FLAT_TYPE';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_flat_type,
				proc: 'admin_flat_typeOps'
			}
		})
		.subscribe(res => {
			this.admin_flat_typeList = res['data'][0];
			if (+this.admin_flat_type['sysid'] > 0){

				this.admin_flat_type = this.admin_flat_typeList[0];
			}
			else
				this.admin_flat_type = {};
		});
	}

	save_admin_flat_type(frm){
		if (!frm.form.valid){
			this.admin_flat_type_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.admin_flat_type['action']='SAVE_ADMIN_FLAT_TYPE';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_flat_type,
				proc: 'admin_flat_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_flat_type_status = res['data'][0][0].msg;
				this.admin_flat_type = {};
				this.select_admin_flat_type();
			}
			else
				this.admin_flat_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_admin_flat_type(sysid){
		this.admin_flat_type['action']='DELETE_ADMIN_FLAT_TYPE';
		this.admin_flat_type['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.admin_flat_type,
				proc: 'admin_flat_typeOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.admin_flat_type_status = res['data'][0][0].msg;
				this.admin_flat_type = {};
				this.select_admin_flat_type();
			}
			else
				this.admin_flat_type_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_admin_flat_type(rec){
		this.admin_flat_type = rec;
		this.admin_flat_type_status = '';
	}

	clear_admin_flat_type(){
		this.admin_flat_type = {};
		this.admin_flat_type_status = '';
	}

}