import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs/Observable';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public unsecureData: string;
  public userData: string;
  public adminData: string;

  public unsecuredError: boolean;
  public userError: boolean;
  public adminError: boolean;

  public unsecuredLoaded: boolean;
  public userLoaded: boolean;
  public adminLoaded: boolean;

  public unsecuredErrorResponse: any;
  public userErrorResponse: any;
  public adminErrorResponse: any;

  constructor(
    private data: DataService,
    private keycloak: KeycloakService
  ) { }

  ngOnInit() {
  }

  getUnsecuredData() {
    this.data.getUnsecureData().subscribe(
      data => {
        this.unsecuredLoaded = true;
        this.unsecureData = data;
      },
      error => {
        this.unsecuredLoaded = true;
        this.unsecuredError = true;
        this.unsecuredErrorResponse = {
          status: error.status,
          message: error.message
        };
      }
    );
  }

  getUserData() {
    this.data.getUserData().subscribe(
      data => {
        this.userLoaded = true;
        this.userData = data;
      },
      error => {
        this.userLoaded = true;
        this.userError = true;
        this.userErrorResponse = {
          status: error.status,
          message: error.message
        };
      }
    );
  }

  getAdminData() {
    this.data.getAdminData().subscribe(
      data => {
        this.adminLoaded = true;
        this.adminData = data;
      },
      error => {
        this.adminLoaded = true;
        this.adminError = true;
        this.adminErrorResponse = {
          status: error.status,
          message: error.message
        };
      }
    );
  }

  login() {
    KeycloakService.login();
  }

  logout() {
    this.keycloak.logout();
  }

}
