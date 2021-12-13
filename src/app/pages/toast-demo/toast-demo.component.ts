import { Component, Injector, OnInit } from '@angular/core';
import { ToastMessageService } from 'cocori-ng/src/feature-core';
import { DateTime } from 'luxon';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

@Component({
  selector: 'toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.scss']
})
export class ToastDemoComponent  extends ExtendPageComponent implements OnInit {

  private message: string = "Ceci est un message dans un toast !"

  constructor(
    public injector: Injector,
    private toastMessageService: ToastMessageService
    ) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Démo du composant Toast` })
  }

  toastSuccess() {
    this.toastMessageService.success(this.message)
  }

  toastError() {
    this.toastMessageService.error(this.message)
  }
  toastErrorStacktrace() {
    this.toastMessageService.errorStacktrace(this.message, {dateError: DateTime.now().toISO(), httpError: null })
  }

  toastInfo() {
    this.toastMessageService.info(this.message)
  }

  toastSuccessCb() {
    this.toastMessageService.success(this.message, () => alert("🔔 Toast callback après fermeture !"))
  }

  toastErrorCb() {
    this.toastMessageService.error(this.message, () => alert("🔔 Toast callback après fermeture !"))
  }

  toastInfoCb() {
    this.toastMessageService.info(this.message, () => alert("🔔 Toast callback après fermeture !"))
  }
}
