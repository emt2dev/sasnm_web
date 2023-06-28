import { Component } from '@angular/core';
import { AuthService } from './shared/authsvc/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sasnm_web';

  constructor(public authService: AuthService) {}

  logout() { this.authService.LOGOUT__USER() }
}
