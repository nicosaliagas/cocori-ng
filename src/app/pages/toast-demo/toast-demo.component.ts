import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from '@cocori-ng/lib/src/lib/feature-core';

@Component({
  selector: 'toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.scss']
})
export class ToastDemoComponent implements OnInit {

  private message: string = "Ceci est un message dans un toast !"

  constructor(private toastMessageService: ToastMessageService) { }

  ngOnInit() { }

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
