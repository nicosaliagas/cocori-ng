import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ModalOptionsModel } from '../../../../core/model/modal.model';
import { FormBuilderService } from '../../../../core/service/form-builder/form-builder.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-confirm-modal',
  templateUrl: './cocoring-confirm-modal.component.html',
  styleUrls: ['./cocoring-confirm-modal.component.scss']
})
export class CocoringConfirmModalComponent implements OnInit {
  @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  formulaire: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalOptionsModel,
    private fb: FormBuilder,
    private mdDialogRef: MatDialogRef<CocoringConfirmModalComponent>,
    private formBuilderService: FormBuilderService) {
    this.formulaire = this.fb.group({})
  }

  ngOnInit(): void {
    if (this.data.withForm) {
      this.buildForm();
    }
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .setViewContainerRef(this.formContainerRef)
      .generateFormInView()
      .form;
  }

  public cancel() {
    this.close(false);
  }

  public close(value) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

  public validateFrom({ value, valid }: { value: any, valid: boolean }) {

    this.formBuilderService.onClickSubmit()

    if (!valid) return;

    console.log("values", value);

    this.close(value);
  }
}
