import { Component } from '@angular/core';
import { AuthService } from './shared/authsvc/auth.service';
import { v2_AuthService } from './shared/authsvc/v2_auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sasnm_web';

  constructor(public v2_authService: v2_AuthService) {}

  logout() { this.v2_authService.LOGOUT__USER() }
}
