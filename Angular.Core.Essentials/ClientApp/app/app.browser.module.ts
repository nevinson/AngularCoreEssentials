import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';

import { AuthenticateService } from './services/authenticate.service';
import { ValidationService } from './services/validation.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        {
            provide: 'BASE_URL',
            useFactory: getBaseUrl
        },
        AuthenticateService,
        ValidationService,
        AuthGuard
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
