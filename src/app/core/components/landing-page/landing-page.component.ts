import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  title = 'ipx-web-ssr';
  email : string = '';
  emailError: string = '';

  constructor(private apiService:ApiService) {}
  submitEmail() {
    this.emailError = '';
    if(this.validateEmail(this.email)) {
      console.log(this.email);
      console.log('hit email validation');
      this.apiService.addEmail(this.email).subscribe(data=>{
        if(data.email) {
          this.email = '';
          this.emailError = 'Added to waitlist successfully'
        }
      })
    } else {
      this.emailError = 'Please provide a valid email'
    }
  }
  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  scroll(el: any) {
    let element = document.getElementById(el);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  ngOnInit() {
  }
}
