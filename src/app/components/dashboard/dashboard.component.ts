import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';

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

  public keycloakAuth: KeycloakInstance;

  constructor(
    private data: DataService,
    private keycloak: KeycloakService
  ) { }

  ngOnInit() {
    this.keycloakAuth = this.keycloak.getKeycloakAuth();
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
          message: error.message && this.isJsonString(error.error) ? JSON.parse(error.error).message : error.message
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
        console.log(error.error);
        this.adminLoaded = true;
        this.adminError = true;
        this.adminErrorResponse = {
          status: error.status,
          message: error.message && this.isJsonString(error.error) ? JSON.parse(error.error).message : error.message
        };
      }
    );
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  displayUserInfo() {
    return this.keycloak.getFullName();
  }

  private isJsonString = (str) => {
    console.log(JSON.parse(str));
    try {
      JSON.parse(str);
    } catch (e) {
      console.log('test');
      return false;
    }
    return true;
  }

}
