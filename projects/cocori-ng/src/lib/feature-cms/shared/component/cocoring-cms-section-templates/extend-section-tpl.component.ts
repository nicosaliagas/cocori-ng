import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfigWysiwygModel, InitWysiwyg } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
    BottomSheetSectionActions,
    SectionModel,
    SectionValue,
    WysiwygSectionCmsModel,
} from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-tpl',
    template: '',
    host: { 'class': 'input-form' }
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

    configsWysiwyg: ConfigWysiwygModel[];
    subscription: Subscription = new Subscription();
    readOnly: boolean = true;
    value: any;

    constructor(injector: Injector) {
        this.fb = injector.get(FormBuilder);
        this._bottomSheet = injector.get(MatBottomSheet);
        this.cdr = injector.get(ChangeDetectorRef);
        this.cmsService = injector.get(CmsService);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    init(wysiwygsNb: number) {
        this.wysiwygsNb = wysiwygsNb

        this.buildForm();

        this.catalogBlocksOpenedEvent()

        this.pageContentSavedEvent()
    }

    private buildForm() {
        this.formulaire = this.fb.group({});
        this.configsWysiwyg = []

        for (let i = 1; i <= this.wysiwygsNb; i++) {
            const nameControl: string = `${this.nameControl}${i}`

            this.formulaire.addControl(nameControl, new FormControl(this.initSectionValue(nameControl)))

            this.configsWysiwyg.push(this.configComponent(nameControl))
        }
    }

    /** variabiliser pour prendre en compte le multi-valeur */
    private initSectionValue(nameControl: string) {
        const blockContent: any = this.section.block.data.content.texte
        const sectionValue: SectionValue = this.section.values[0]?.value

        return sectionValue || blockContent
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

                    /** pas sûr pour le .controls... */
                    /** variabiliser pour prendre en compte le multi-valeur */
                    if (isOpened && this.formulaire.controls) {
                        this.value = this.formulaire.get(`${this.nameControl}1`).value
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

                case 'duplicate':
                    this.saveSectionValue()

                    this.cmsService.duplicateSection(this.section)

                    break;

                default:
                    break;
            }
        });
    }

    /** variabiliser pour prendre en compte le multi-valeur */
    private saveSectionValue() {
        const value = this.formulaire.get(`${this.nameControl}1`).value

        this.section.values[0] = { editorId: `${this.nameControl}1`, value: value }
    }
}
