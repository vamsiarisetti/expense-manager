import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  reset(){

  }
}
