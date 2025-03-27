import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { rootReducer } from './store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './core/services/identity/user.service';
import { IdentityApiHttpService } from './core/services/common/base-identity-api-http.service';
import { ApiHttpService } from './core/services/common/base-api-http.service';
import { LookUpService } from './core/services/common/look-up.service';
import { InstitutionService } from './core/services/identity/institution.service';
import { UserEffects } from './store/identity/user/user.effect';
import { LookUpEffects } from './store/common/look-up/look-up.effect';
import { RoleService } from './core/services/identity/role.service';
import { PermissionService } from './core/services/identity/permission.service';
import { InstitutionEffects } from './store/identity/institution/institution.effect';


export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        StoreModule.forRoot(rootReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production, 
        }),
        EffectsModule.forRoot([
          UserEffects,
          LookUpEffects,
          InstitutionEffects
        ]),
        PagesModule,
        NgPipesModule], providers: [
          UserService,
          IdentityApiHttpService,
          ApiHttpService,
          LookUpService,
          InstitutionService,
          RoleService,
          PermissionService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
