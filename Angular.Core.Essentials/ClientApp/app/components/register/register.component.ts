import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidationService } from '../../services/validation.service'
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
    selector: 'register-page',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    constructor(
        private router: Router,
        private flashMessage: FlashMessagesService,
        private validateService: ValidationService,
        private authService: AuthenticateService) { }

    onSignupSubmit(f: NgForm) {
        const user = {
            firstName: f.value.firstName,
            lastName: f.value.lastName,
            email: f.value.email,
            password: f.value.password,
            location: f.value.location
        }

        console.log(user);

        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }

        this.authService.registerUser(user).subscribe(data => {
            console.log(data);

            if (data.success == true) {
                this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(['/login']);
            } else {
                this.flashMessage.show(`Error: ${data.message}`, { cssClass: 'alert-danger', timeout: 3000 });
                this.router.navigate(['/register']);
            }
        });
    }
}
