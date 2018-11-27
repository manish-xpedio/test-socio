import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	login: any = {};
	val_res: any = {};
	
	login_status: string = '';
	can_hide: any;
	logged_in: boolean = false;
	
	@Output() parent_flag = new EventEmitter();
	@Output() menu_list = new EventEmitter();
	@Output() user_details = new EventEmitter();
	@ViewChild('closeBtn') loginModal: ElementRef;

  	constructor( private ds: DataService, private route: Router ) { }

  	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'home',
				hide_side_menu: true, 
				hide_login_btn: false, 
				hide_logout_btn: true
			}
		);
	  }
	  
	login_action(){
		this.menu_list.emit([{menu_name: 'Admin'}]);
		this.loginModal.nativeElement.click();	
		this.route.navigate(['/dashboard']);
	}  

	validate_user(frm){
		if (!frm.form.valid){
			this.login_status = 'Username and password both are mandatory.';
			return;
		}
		this.login['action'] = 'AUTH';
		this.ds.getData({
			url: '/db_data',
			data: {
				trans: this.login,
				proc: 'admin_access_loginOps'
			}
		})
		.subscribe(res => {
console.log(res);
			this.val_res = res['data'][0][0];
			console.log(this.val_res);
			if (this.val_res['status']=='SUCCESS'){
				this.loginModal.nativeElement.click();	
				this.user_details.emit(res['data'][0]);
				this.menu_list.emit(res['data'][1]);
				this.route.navigate(['/dashboard']);
			}
			else if (this.val_res['status']=='CHANGE_PASS'){
				this.loginModal.nativeElement.click();	
				this.menu_list.emit(res['data'][1]);
				this.route.navigate(['/changepass'], { queryParams: {sysid: this.val_res['sysid']}});
			}
			else if (this.val_res['status']=='VALIDATE_OTP'){
				this.loginModal.nativeElement.click();	
				this.menu_list.emit(res['data'][1]);
				this.route.navigate(['/validateotp'], { queryParams: {sysid: this.val_res['sysid']}});
			}
			else
				this.login_status = this.val_res['err_message'];
				
		});
	}
}
