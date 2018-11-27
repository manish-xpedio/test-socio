import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-escmatrix',
	templateUrl: './escmatrix.component.html',
	styleUrls: ['./escmatrix.component.css']
})

export class EscmatrixComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();


	crm_esc_matrix_status: string = '';
	crm_esc_matrix: any = {};
	crm_esc_matrixList: any = [];

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'escmatrix',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.route.queryParams
			.subscribe(params => {
			this.crm_esc_matrix['sysid'] = params.id;
		});
		this.ref_select();
		this.select_crm_esc_matrix();


	}


	ref_select(){
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: {action: 'REF_SELECT'},
				proc: 'crm_esc_matrixOps'
			}
		})
		.subscribe(res => {
		});
	}

	select_crm_esc_matrix(){
		this.crm_esc_matrix['action']='SELECT_CRM_ESC_MATRIX';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_esc_matrix,
				proc: 'crm_esc_matrixOps'
			}
		})
		.subscribe(res => {
			this.crm_esc_matrixList = res['data'][0];
			if (+this.crm_esc_matrix['sysid'] > 0){
				this.crm_esc_matrix = this.crm_esc_matrixList[0];
			}
			else
				this.crm_esc_matrix = {};
		});
	}

	save_crm_esc_matrix(frm){
		if (!frm.form.valid){
			this.crm_esc_matrix_status = 'Fields indicated by * are mandatory.';
			return;
		}
		this.crm_esc_matrix['action']='SAVE_CRM_ESC_MATRIX';

		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_esc_matrix,
				proc: 'crm_esc_matrixOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_esc_matrix_status = res['data'][0][0].msg;
				this.crm_esc_matrix = {};
				this.select_crm_esc_matrix();
			}
			else
				this.crm_esc_matrix_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	delete_crm_esc_matrix(sysid){
		this.crm_esc_matrix['action']='DELETE_CRM_ESC_MATRIX';
		this.crm_esc_matrix['sysid']=sysid;
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.crm_esc_matrix,
				proc: 'crm_esc_matrixOps'
			}
		})
		.subscribe(res => {
			if (res['error']=='None') {
				this.crm_esc_matrix_status = res['data'][0][0].msg;
				this.crm_esc_matrix = {};
				this.select_crm_esc_matrix();
			}
			else
				this.crm_esc_matrix_status = res['error']['sqlMessage'].substring(0,99);
		});
	}

	current_record_crm_esc_matrix(rec){
		this.crm_esc_matrix = rec;
		this.crm_esc_matrix_status = '';
	}

	clear_crm_esc_matrix(){
		this.crm_esc_matrix = {};
		this.crm_esc_matrix_status = '';
	}

}