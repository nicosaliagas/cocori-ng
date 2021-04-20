import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfigWysiwygModel, InitWysiwyg } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BottomSheetSectionActions, SectionModel, WysiwygSectionCmsModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['./cocoring-cms-section.component.scss'],
  providers: [MatBottomSheet]
})
export class CocoringCmsSectionComponent implements OnInit, OnDestroy {

  @Input() section: SectionModel
  @Input() wysiwyg: WysiwygSectionCmsModel

  formulaire: FormGroup
  nameControl: string = 'editorInline' // #todo: mettre un id ou un FormArray

  _configInline: ConfigWysiwygModel;
  subscription: Subscription = new Subscription();
  readOnly: boolean = true;
  value: any;

  constructor(
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private cdr: ChangeDetectorRef,
    private cmsService: CmsService,
  ) {
    this.formulaire = this.fb.group({});
  }

  ngOnInit(): void {
    console.log("datas section", this.section)
    console.log("datas wysiwyg 😁 ", this.wysiwyg)

    this._configInline = this.initConfigComponent(true)

    this.value = this.section.block.content.texte

    this.catalogBlocksOpenedEvent()

    this.pageContentSavedEvent()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private initConfigComponent(inline: boolean) {
    let config = {
      apiFile: this.wysiwyg.apiFile,
      apiFileDownload: this.wysiwyg.apiFileDownload,
      apiKey: this.wysiwyg.apiKey,
      params: <InitWysiwyg>{
        inline: inline
      },
      nameLabel: '',
      formGroup: this.formulaire,
      nameControl: this.nameControl,
      validators: []
    }

    return config
  }

  private catalogBlocksOpenedEvent() {
    this.subscription.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          this.readOnly = isOpened

          if (isOpened && this.formulaire.get(this.nameControl)) {
            this.value = this.formulaire.get(this.nameControl).value
          }
        }),
        tap(_ => this.cdr.detectChanges())
      ).subscribe()
    )
  }

  private pageContentSavedEvent() {
    this.subscription.add(
      this.cmsService.onContentPageSaved().pipe(
        tap(_ => console.log(`Save section ${this.section.idSection} : ${this.formulaire.get(this.nameControl).value}`)),
      ).subscribe()
    )
  }

  callback(controlName: string) {
    this.formulaire.get(controlName).setValue(this.value)
  }

  openBottomSheet() {
    if (!this.readOnly) return;

    const bottomSheet = this._bottomSheet.open(CocoringCmsSectionActionsComponent, {
      panelClass: 'bottom-sheet-container',
      data: <any>{
        idSection: this.section.idSection,
      }
    });

    bottomSheet.afterDismissed().subscribe((action: BottomSheetSectionActions) => {
      console.log("return bottom sheet", action)

      switch (action) {
        case 'remove':
          this.cmsService.removeSection(this.section.idSection)

          break;

        default:
          break;
      }
    });
  }
}
