import { Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { DefaultConfigComponent } from '../../../config/config.components';
import { ConfigEvents } from '../../../config/config.events';
import { ClasseComponents } from '../../../shared/component/form';
import {
    ButtonComponentInputs,
    ButtonIconPositon,
    ConfigComponentInputs,
    ConfigInputComponent,
    InputFieldAppearance,
    OutputCallback,
    TypeButtonEnum,
} from '../../model/component-inputs.model';
import { DataSourceInput } from '../../model/data-source.model';
import { FormInputComponents } from '../../model/form-input-components.model';
import { BroadcastEventService } from '../broadcast-event.service';
import { HelperService } from '../helper/helper.service';
import { InjectComponentService } from '../inject-component.service';
import { ValidatorsService } from '../validators.service';

/**
 * https://www.typescriptlang.org/play?#code/C4TwDgpgBAggTgcwK4FsIDtgBVwQM4A8WAfFALxRZQQAewGAJnlABQB0HUAhongFxQAlugBmEOFACqASnKlhYiQCUoAfikD0EAG7iA3AChQkKEohgANlwDGEM8CRx0OSAQDyAGigA5UhXYcXALwyGiYLvjuxLJkpN6GRrhQAEJIghYM4gQA0tR0jMwA1hAgAPYiUADCpejWcBD0qemZcH5QAN4GUFAA2pJC6FDZALoC-bT06ExQAOQARmkZM2pVNXUNEE0Z4n3DUAJmljZ2DY7OuARd3au19Y2LLbseV91bLQQAojTWFkiZOV5JKQJgUoFpdBJ1PMHssBF8fn8IACpMRiFc0QBfBIiJC1YCCGpQBbNcQsaQCN5ZeG-f7FMoVaq3DaUuBeaHNGaojpXO5nMEQADuN3W9xJcDJ3GYXHQIEMGIMBh+XDwzEZIs2D3E3O6XDJAmAAAtBMxOtcoLynFBDcbDN15Vc5nqrUaTS9zadLda8LaoPbusSMk68MA4MIENrrhbBjMRKVSjMffL7QGWmS2LrpGxHZmU2S9FAAPQFqClQoGFOknNpjNZh55wvF0vlzXinN16T5ovUOBwUpwZti6tp3Mdhvd3v9iutrPD9ud4viCcD7bTms1kfz8d95epqt72vNetdxfbqdD-fZg+B0fHnunlvn9PD2eHm8Lu9wIA
 * https://medium.com/@bensammons/building-a-fluent-interface-with-typescript-using-generics-in-typescript-3-4d206f00dba5
 */

type AddInput<Builder, InputName extends string> =
    Builder extends FormBuilderService<infer InputNames, infer ButtonNames>
    ? FormBuilderService<InputNames | InputName, ButtonNames>
    : never

// type AddButton<Builder, ButtonName extends string> =
//     Builder extends FormBuilderService<infer InputNames, infer ButtonNames>
//     ? FormBuilderService<InputNames, ButtonNames | ButtonName>
//     : never

type InferInputNames<Builder> =
    Builder extends FormBuilderService<infer InputNames>
    ? InputNames
    : never

class InputConfigBuilder<Builder> {

    _isRequired: boolean;
    _styleCompact: boolean;
    _appearance: InputFieldAppearance;
    _nameLabel: string;
    _icon: string;
    _maxlength: number;
    _inRelationWith: string;
    _type: FormInputComponents;
    _dataSource: DataSourceInput;
    _callbackComponent: OutputCallback;

    isRequired() {
        this._isRequired = true

        return this
    }

    styleCompact() {
        this._styleCompact = true

        return this
    }

    appearance(appearance: InputFieldAppearance) {
        this._appearance = appearance

        return this
    }

    nameLabel(nameLabel: string) {
        this._nameLabel = nameLabel

        return this
    }

    inRelationWith<InputName extends InferInputNames<Builder>>(inputName: InputName) {
        this._inRelationWith = inputName

        return this
    }

    dataSource(dataSource: DataSourceInput) {
        this._dataSource = dataSource

        return this
    }

    maxlength(value: number) {
        this._maxlength = value

        return this
    }

    icon(materialIconName: string) {
        this._icon = materialIconName

        return this
    }

    typeInput(
        type: FormInputComponents) {
        this._type = type

        return this
    }

    outputCallback(outputCallback: OutputCallback) {
        this._callbackComponent = outputCallback

        return this
    }
}

class ButtonConfigBuilder<Builder> {

    _type: TypeButtonEnum;
    _icon: string;
    _className: string;
    _iconPosition: ButtonIconPositon;
    _callbackComponent: OutputCallback;
    _url: string;
    _openNewTab: boolean;

    isTypeSubmit(is: boolean = true) {
        this._type = is ? TypeButtonEnum.SUBMIT : TypeButtonEnum.BUTTON

        return this
    }

    type(typeOfTheBtn: TypeButtonEnum = TypeButtonEnum.BUTTON) {
        this._type = typeOfTheBtn

        return this
    }

    icon(materialIconName: string, buttonIconPosition: ButtonIconPositon = ButtonIconPositon.START) {
        this._icon = materialIconName
        this._iconPosition = buttonIconPosition

        return this
    }

    url(url: string) {
        this._url = url

        return this
    }

    openNewTab(openNewTab: boolean) {
        this._openNewTab = openNewTab

        return this
    }

    class(className: string) {
        this._className = className

        return this
    }

    outputCallback(outputCallback: OutputCallback) {
        this._callbackComponent = outputCallback

        return this
    }
}

@Injectable({
    providedIn: 'root',
})
export class FormBuilderService<InputNames extends string = never, ButtonNames extends string = never, NodeNames extends string = never,> {
    public formId: string; /** error handler */
    public formName: string; /** mapping details */

    private currentForm: FormGroup;
    private _configInputsForm: ConfigInputComponent[] = [];
    private _appearance: InputFieldAppearance = <InputFieldAppearance>DefaultConfigComponent.form.appearance
    private _styleCompact: boolean = DefaultConfigComponent.form.styleCompact;

    constructor(
        private fb: FormBuilder,
        private helperService: HelperService,
        private broadcastEventService: BroadcastEventService,
        public generateComponentViewService: GenerateComponentViewService
    ) {
        this.newForm()
    }

    set form(form: FormGroup) {
        this.currentForm = form;
    }

    get form(): FormGroup {
        return this.currentForm
    }

    get styleCompact(): boolean {
        return this._styleCompact
    }

    getAppearance(): InputFieldAppearance {
        return this._appearance
    }

    get configInputsForm(): ConfigInputComponent[] {
        return this._configInputsForm
    }

    newForm() {
        this.currentForm = this.fb.group({});

        this._configInputsForm.splice(0, this._configInputsForm.length)

        this.identityForm(this.helperService.generateGuid())

        return this;
    }

    appearance(value: InputFieldAppearance) {
        this._appearance = value

        return this;
    }

    identityForm(id: string, name?: string) {
        this.formId = id;

        this.formName = name;

        this.currentForm.addControl(DefaultConfigComponent.form.keyId, new FormControl(id))

        return this;
    }

    setViewContainerRef(containerRef: ViewContainerRef) {
        this.generateComponentViewService.setViewContainerRef(containerRef)

        return this;
    }

    addInput<InputName extends string, ReturnType extends AddInput<this, InputName>>(
        inputName: Exclude<InputName, InputNames>,
        configBuilder: (b: InputConfigBuilder<this>) => InputConfigBuilder<this>
    ): ReturnType {

        const builder = configBuilder(new InputConfigBuilder);

        /** on formalise la configuration du champ input */
        const configInputComponent: ConfigInputComponent = {
            type: builder._type,
            formGroup: this.currentForm,
            nameControl: inputName,
            nameLabel: builder._nameLabel,
            dataSource: builder._dataSource,
            inRelationWith: builder._inRelationWith,
            styleCompact: builder._styleCompact ? builder._styleCompact : this.styleCompact,
            icon: builder._icon,
            maxlength: builder._maxlength,
            appearance: builder._appearance ? builder._appearance : this._appearance,
            callbackComponent: builder._callbackComponent,
            validators: []
        };

        /** on traite la validation du champ input */

        if (builder._isRequired) {
            configInputComponent.validators.push(ValidatorsService.require)
        }

        this._configInputsForm.push(configInputComponent)

        this.generateComponentViewService.addComponentToView(configInputComponent.type, configInputComponent, builder._callbackComponent);

        return this as FormBuilderService as ReturnType;
    }

    /** Déclenche manuellement la création des champs dans la vue */
    generateFormInView() {
        if (this.generateComponentViewService.getViewContainerRef()) {
            this._configInputsForm.forEach((conf: ConfigInputComponent) => {
                this.generateComponentViewService.addComponentToView(conf.type, conf, conf.callbackComponent);
            })
        }
        return this
    }

    addButton<ButtonName extends string>(
        buttonName: Exclude<ButtonName, ButtonNames>,
        configBuilder: (b: ButtonConfigBuilder<this>) => ButtonConfigBuilder<this>
    ) {

        const builder = configBuilder(new ButtonConfigBuilder);

        const configInputComponent: ButtonComponentInputs = {
            text: buttonName,
            type: builder._type,
            icon: builder._icon,
            url: builder._url,
            openNewTab: builder._openNewTab,
            className: builder._className,
            iconPosition: builder._iconPosition,
            onClickSubmit: this.onClickSubmit.bind(this)
        };

        if(builder._type === TypeButtonEnum.LINK) {
            this.generateComponentViewService.addComponentToView(FormInputComponents.LINK, configInputComponent, builder._callbackComponent);
        } else {
            this.generateComponentViewService.addComponentToView(FormInputComponents.BUTTON, configInputComponent, builder._callbackComponent);
        }

        return this as FormBuilderService;
    }

    onClickSubmit() {
        this.broadcastEventService.broadcast({ eventKeys: [ConfigEvents.FORM_SUBMITTED, this.formId], eventData: this.form })
    }
}

@Injectable({
    providedIn: 'root',
})
export class GenerateComponentViewService {
    private formContainerRef: ViewContainerRef;

    constructor(private injectComponentService: InjectComponentService) {
    }

    setViewContainerRef(containerRef: ViewContainerRef) {
        this.formContainerRef = containerRef;

        return this;
    }

    getViewContainerRef(): ViewContainerRef {
        return this.formContainerRef
    }

    addComponentToView(componentType: FormInputComponents, configComponent: ConfigComponentInputs, callback: OutputCallback) {

        if (!this.getViewContainerRef()) return;

        const componentToAdd = this.returnComponentClassFromType(componentType);

        this.injectComponentService.loadAndAddComponentToContainer(componentToAdd, this.formContainerRef,
            { config: configComponent }, callback
        );
    }

    private returnComponentClassFromType(typeOfComponent: FormInputComponents) {
        if (!ClasseComponents.hasOwnProperty(typeOfComponent)) {
            const error: string = `This type of component : '${typeOfComponent}' doesn't exist`;
            throw new Error(error);
        } else {
            return ClasseComponents[typeOfComponent];
        }
    }
}
