import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { BooleanFilters, ColumnDatagridModel, DataSourceType, FormInputComponents } from 'cocori-ng/src/feature-core';

import { DatagridService } from '../../../../core';
import { FormBuilderService } from '../../../../core/service/form-builder/form-builder.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-filter-modal',
  templateUrl: './cocoring-datagrid-filter-modal.component.html',
  styleUrls: ['./cocoring-datagrid-filter-modal.component.scss']
})
export class CocoringDatagridFilterModalComponent implements OnInit {
  @ViewChild('BooleanFilterFormContainerRef', { static: false, read: ViewContainerRef }) booleanFilterFormContainerRef: ViewContainerRef;
  @ViewChild('ButtonFormContainerRef', { static: false, read: ViewContainerRef }) buttonFormContainerRef: ViewContainerRef;
  @ViewChild('sidenav') sidenav: MatSidenav;

  formulaire: UntypedFormGroup;
  disabled = true
  isSidenavOpen: boolean = false;

  datagridService: DatagridService;
  currentColumn: ColumnDatagridModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { datagridService: DatagridService },
    private cdr: ChangeDetectorRef,
    private formBuilderService: FormBuilderService,
    private mdDialogRef: MatDialogRef<CocoringDatagridFilterModalComponent>) {

    this.datagridService = data.datagridService
    this.formulaire = this.formBuilderService.newForm().form
  }

  ngOnInit(): void {
  }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }

  /** Reset le form des filtres selon le mode */
  public toggleFiltersOrClose() {
    if (this.currentColumn) {
      // back to the list of columns
      this.currentColumn = null

      this.formulaire.reset()

      this.sidenav.toggle()
    } else {
      this.close(null)
    }
  }

  public columnSelected(column: ColumnDatagridModel) {
    this.currentColumn = column

    /** on fait apparaître le paneau détail de la colonne */
    this.sidenav.toggle()

    /** on mets à jour la vue comme ça les var booleanFilterFormContainerRef et buttonFormContainerRef sont définies */
    this.cdr.detectChanges()

    /** on init le form et on ajoute les éléments dans la vue dynamiquement 🖕 */
    if (this.currentColumn.dataType == 'boolean') {
      this.buildFormFiltersBoolean()
    }
  }

  public trackBy(item: any, index: number) {
    return `${item.id}-${index}`
  }

  public dropColumn(event: CdkDragDrop<ColumnDatagridModel[]>) {
    moveItemInArray(this.datagridService.config.columns, event.previousIndex, event.currentIndex);

    this.datagridService.reOrderColumns$.next({ previousIndex: event.previousIndex, currentIndex: event.currentIndex })
  }

  private buildFormFiltersBoolean() {
    let formBuilderService = this.formBuilderService
      .appearance('fill') // par défaut c'est outline
      .setViewContainerRef(this.booleanFilterFormContainerRef)
      .addInput('selectAll', config => config
        .nameLabel('Tout sélectionner')
        .typeInput(FormInputComponents.INPUT_CHECKBOX_INDETERMINATE)
        .dataSource({
          type: DataSourceType.BRUTE,
          dataSourceNameProperty: 'name',
          value: [{ id: "noSelected", name: "non" }, { id: "allSelected", name: "oui" }]
        })
      )
      ;

    formBuilderService = this.buildFormAddButtonsAction(formBuilderService, this.buttonFormContainerRef)

    this.formulaire = formBuilderService.form

    if (this.currentColumn.filters) {
      this.formulaire.patchValue(this.currentColumn.filters)
    }

  }

  private buildFormAddButtonsAction(formBuilderService: FormBuilderService, viewContainerRef: ViewContainerRef) {
    return formBuilderService
      .setViewContainerRef(viewContainerRef)
      .addButton('Annuler', config => config
        .isTypeSubmit(false)
        .outputCallback({
          click: () => this.toggleFiltersOrClose()
        })
      )
      .addButton('Appliquer', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({
          callback: () => { }
        })
      )
  }

  public validateFilters({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;
    
    this.currentColumn.filters = <BooleanFilters>value
    
    this.datagridService.updateColumn$.next(this.currentColumn)

    this.datagridService.refreshNeeded$.next()

    this.toggleFiltersOrClose()
  }
}
