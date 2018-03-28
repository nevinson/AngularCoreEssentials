import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidationService } from '../../services/validation.service';
import { AuthenticateService } from '../../services/authenticate.service';


@Component({
    selector: 'login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(
        private router: Router,
        private flashMessage: FlashMessagesService,
        private validateService: ValidationService,
        private authenticateService: AuthenticateService) { }

    onSigninSubmit(f: NgForm) {
        const user = {
            username: f.value.username,
            password: f.value.password
        }

        console.log(user);

        if (!this.validateService.validateEmail(user.username)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }

        this.authenticateService.authenticateUser(user).subscribe(data => {
            console.log(data);

            if (data.id && data.auth_token) {
                this.authenticateService.storeUserData(data.auth_token); //, data.user
                this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
                this.router.navigate(['/home']);
            } else {
                this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                this.router.navigate(['/signin']);
            }
        });
    }
}
