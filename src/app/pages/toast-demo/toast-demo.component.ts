import { Component, Injector, OnInit } from '@angular/core';
import { ToastMessageService } from '@cocori-ng/lib/src/lib/feature-core';
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

  toastInfo() {
    this.toastMessageService.info(this.message)
  }

  toastSuccessCb() {
    this.toastMessageService.success(this.message, this.toastMessageService.defaultDuration, () => alert("🔔 Toast callback après fermeture !"))
  }

  toastErrorCb() {
    this.toastMessageService.error(this.message, null, () => alert("🔔 Toast callback après fermeture !"))
  }

  toastInfoCb() {
    this.toastMessageService.info(this.message, this.toastMessageService.defaultDuration, () => alert("🔔 Toast callback après fermeture !"))
  }
}
