import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  loading:boolean = false;
  email = "test@gamil.com";
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  resendEmail(){

  }
}
