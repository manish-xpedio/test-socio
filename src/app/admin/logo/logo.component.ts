import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.css']
})

export class LogoComponent implements OnInit {
	@Output() parent_flag = new EventEmitter();
	
	
	admin_logo_status: string = '';
	is_disabled: boolean = true;
	file_data: any;
	m_file_name: File;
	img_name: string = '/assets/logo4.png?';

	constructor( private ds: DataService, private route: ActivatedRoute, private router: Router ){
	}

	ngOnInit() {
		this.parent_flag.emit(
			{
				comp_name: 'logo',
				hide_side_menu: false,
				hide_login_btn: true,
				hide_logout_btn: false,
				content_name: 'main-content'
			}
		);
		this.is_disabled = true;
	}
	
	selected_file(file_name){
    	this.m_file_name = file_name;
		if (this.m_file_name[0] == undefined){
			this.is_disabled = true;
			return;
		}
		
		if (this.m_file_name[0].name == '' || this.m_file_name[0].name == undefined){
			this.is_disabled = true;
			return;
		}

		if (Math.round(this.m_file_name[0].size/1024) > 500){
			this.admin_logo_status = 'Maximum allowed size is 500KB. Current size is ' + Math.round(this.m_file_name[0].size/1024) + ' KB';
			return;
		}
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.img_name = event.target.result;
		}
		reader.readAsDataURL(this.m_file_name[0]);
		this.admin_logo_status = 'Size: ' + Math.round(this.m_file_name[0].size/1024)+' KB';
		this.is_disabled = false;
  	}

  	upload_file(){
    	this.ds.pushFileToStorage(this.m_file_name[0], { img_name: 'logo.png' }).subscribe(event => {
			this.admin_logo_status = 'Image was uploaded successfully.';
			setTimeout(()=> { this.admin_logo_status = ''; }, 5000);
     	});
  	}
}