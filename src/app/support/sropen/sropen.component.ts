import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-sropen',
	templateUrl: './sropen.component.html',
	styleUrls: ['./sropen.component.css']
})

export class SropenComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	supp_sr_status: string = '';
	crm_membersList: any = [];
	supp_sr: any = {};
	supp_srList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'sropen',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.supp_sr['sysid'] = params.id;
		});
		this.ref_select();
		this.select_supp_sr();
		this.supp_sr['sr_date'] = this.ds.getJsonDate(this.supp_sr['sr_date']);
		this.supp_sr['resolution_date'] = this.ds.getJsonDate(this.supp_sr['resolution_date']);

	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'supp_srOps'
			}
		})
		.subscribe(res => {
			this.crm_membersList = res['data'][0];
		});
	}

	select_supp_sr(){
		this.supp_sr['action']='SELECT_SUPP_SR';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_sr,
				proc: 'supp_srOps'
			}
		})
		.subscribe(res => {
			this.supp_srList = res['data'][0];
			if (+this.supp_sr['sysid'] > 0){
				this.supp_sr = this.supp_srList[0];
			}
			else
				this.supp_sr = {};
		});
	}

	save_supp_sr(frm){
		if (!frm.form.valid){
			this.supp_sr_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.supp_sr['action']='SAVE_SUPP_SR';
		this.supp_sr['sr_date'] = this.ds.getStringDate(this.supp_sr['sr_date']);
		this.supp_sr['resolution_date'] = this.ds.getStringDate(this.supp_sr['resolution_date']);
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_sr,
				proc: 'supp_srOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_sr_status = res['data'][0][0].msg;
				this.supp_sr = {};
				this.select_supp_sr();
			}
			else
				this.supp_sr_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_supp_sr(sysid){
		this.supp_sr['action']='DELETE_SUPP_SR';
		this.supp_sr['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.supp_sr,
				proc: 'supp_srOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.supp_sr_status = res['data'][0][0].msg;
				this.supp_sr = {};
				this.select_supp_sr();
			}
			else
				this.supp_sr_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_supp_sr(rec){
		this.supp_sr = rec;
		this.supp_sr_status = '';
	}

	clear_supp_sr(){
		this.supp_sr = {};
		this.supp_sr_status = '';
	}

}