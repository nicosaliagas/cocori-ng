import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormHelperService, InitWysiwyg, WysiwygConfigSection } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import {
  BottomSheetSectionReturnAction,
  EditorValues,
  SectionModel,
  WysiwygSectionCmsModel,
} from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-tpl',
    template: '',
    host: { 'class': 'input-form' },
})

export abstract class ExtendSectionTplComponent implements OnDestroy {
    @Input() section: SectionModel
    @Input() wysiwyg: WysiwygSectionCmsModel

    private subscriptions: Subscription = new Subscription();
    private fb: FormBuilder;
    private _bottomSheet: MatBottomSheet;
    private cdr: any;
    private cmsService: CmsService;

    formulaire: FormGroup
    wysiwygsNb: number
    nameControl: string = 'editor'

    configsWysiwyg: WysiwygConfigSection[];
    subscription: Subscription = new Subscription();
    readOnly: boolean = true;
    value: any;
    formHelper: FormHelperService;

    constructor(injector: Injector) {
        this.fb = injector.get(FormBuilder);
        this._bottomSheet = injector.get(MatBottomSheet);
        this.cdr = injector.get(ChangeDetectorRef);
        this.cmsService = injector.get(CmsService);
        this.formHelper = injector.get(FormHelperService);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    init(wysiwygsNb: number) {
        this.wysiwygsNb = wysiwygsNb

        this.buildForm();

        this.catalogBlocksOpenedEvent()

        this.pageContentSavedEvent()

        this.onBackgroundColorEvent()
    }

    private buildForm() {
        this.formulaire = this.fb.group({});
        this.configsWysiwyg = []

        for (let i = 1; i <= this.wysiwygsNb; i++) {
            const nameControl: string = `${this.nameControl}${i}`

            this.formulaire.addControl(nameControl, new FormControl(this.initSectionValue(nameControl)))

            this.configsWysiwyg[nameControl] = this.configComponent(nameControl)
        }
    }

    private initSectionValue(nameControl: string) {
        const blockContent: EditorValues = this.section.block.data.content

        const blockValue: string = blockContent?.hasOwnProperty(nameControl) ? blockContent[nameControl] : null
        const sectionValue: string = this.section.values?.hasOwnProperty(nameControl) ? this.section.values[nameControl] : null

        return sectionValue || blockValue
    }

    private configComponent(nameControl: string) {
        let config = {
            apiFile: this.wysiwyg.apiFile,
            apiFileDownload: this.wysiwyg.apiFileDownload,
            apiKey: this.wysiwyg.apiKey,
            params: <InitWysiwyg>{
                inline: true
            },
            nameLabel: '',
            formGroup: this.formulaire,
            nameControl: nameControl,
            validators: []
        }

        return config
    }

    private catalogBlocksOpenedEvent() {
        this.subscription.add(
            this.cmsService.catalogBlocksOpened$.pipe(
                tap((isOpened: boolean) => {
                    this.readOnly = isOpened

                    if (isOpened && this.formHelper.countControlsForm(this.formulaire) > 0) {
                        this.value = this.formulaire.value
                    }
                }),
                tap(_ => this.cdr.detectChanges())
            ).subscribe()
        )
    }

    /** #todo */
    private pageContentSavedEvent() {
        this.subscription.add(
            this.cmsService.onContentPageSaved().pipe(
                tap(_ => console.log(`Save section ${this.section.idSection}`)),
            ).subscribe()
        )
    }

    private onBackgroundColorEvent() {
        this.subscription.add(
            this.cmsService.backgroundColor$.pipe(
                filter((idSection: string) => idSection === this.section.idSection),
                tap(_ => this.cdr.detectChanges()),
            ).subscribe()
        )
    }

    openBottomSheet() {
        if (!this.readOnly) return;

        this.saveSectionValue()

        const bottomSheet = this._bottomSheet.open(CocoringCmsSectionActionsComponent, {
            panelClass: 'bottom-sheet-container',
            data: <any>{
                section: this.section,
            }
        });

        this.subscription.add(
            bottomSheet.afterDismissed().subscribe((datas: BottomSheetSectionReturnAction) => {
                if (!datas) return;

                switch (datas.action) {
                    case 'remove':
                        this.cmsService.removeSection(this.section.idSection)

                        break;

                    case 'duplicate':
                        this.cmsService.duplicateSection(this.section)

                        break;

                    case 'backgroundColor':
                        this.saveSectionBackgroundColor(datas.value)

                        console.log("value backgroundColor", datas.value)

                        break;

                    default:
                        break;
                }
            })
        )
    }

    /** ex valeur du formulaire : {editor1: "<h1>coucou</h1>", editor2: "<h1>hello</h1>"} */
    private saveSectionValue() {
        this.section.values = this.formulaire.value
    }

    private saveSectionBackgroundColor(color: string) {
        this.section.backgroundColor = color
    }
}
