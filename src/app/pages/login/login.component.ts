import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilderService, TokenService } from '@cocori-ng/lib';
import { FormInputComponents } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginApiService } from 'src/app/core/api/LoginApi.service';
import { LoginModel, TokensLoginModel } from 'src/app/core/model/Login.model';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  formulaire: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private formBuilderService: FormBuilderService,
    public viewContainerRef: ViewContainerRef,
    private loginApiService: LoginApiService
  ) {

    this.formulaire = new FormGroup({})

    this.formContainerRef = viewContainerRef
  }

  ngOnInit() {
    this.buildForm()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private buildForm() {
    this.formulaire = <FormGroup><unknown>this.formBuilderService
      .newForm()
      .appearance('fill')
      .setViewContainerRef(this.formContainerRef)
      .addInput('email', config => config
        .isRequired()
        .nameLabel('Adresse e-mail')
        .typeInput(FormInputComponents.INPUT_EMAIL))
      .addInput('password', config => config
        .isRequired()
        .nameLabel('Mot de passe')
        .typeInput(FormInputComponents.INPUT_PASSWORD))
      .addButton('Se connecter', config => config
        .isTypeSubmit())
      .form
  }

  validateFrom({ value, valid }: { value: LoginModel, valid: boolean }) {
    if (!valid) return;

    this.subscriptions.add(
      this.loginApiService.UserAccessToken(value).pipe(
        map((datas: TokensLoginModel) => {
          this.tokenService.accessToken = datas.accessToken || "";
          this.tokenService.refreshToken = datas.refreshToken || "";

          this.loginApiService.refreshToken();

          if (this.loginApiService.redirectUrl) {
            this.router.navigate([this.loginApiService.redirectUrl]);
            this.loginApiService.redirectUrl = undefined;
          } else {
            this.router.navigate(['/bo/home']);
          }
        })
      ).subscribe()
    )
  }
}