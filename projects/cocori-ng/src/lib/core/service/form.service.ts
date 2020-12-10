import { Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ConfigEvents } from '../../config/config.events';
import { InputComponents, OutputCallback } from '../../shared/component/form';
import {
    ButtonComponentInputs,
    ConfigComponentInputs,
    InputComponentInputs,
    NameControl,
    TypeButtonEnum,
} from '../model/component-inputs.model';
import { DataSourceInput } from '../model/data-source.model';
import { BroadcastEventService } from './broadcast-event.service';
import { InjectComponentService } from './inject-component.service';
import { ValidatorsService } from './validators.service';

/**
 * https://www.typescriptlang.org/play?#code/C4TwDgpgBAggTgcwK4FsIDtgBVwQM4A8WAfFALxRZQQAewGAJnlABQB0HUAhongFxQAlugBmEOFACqASnKlhYiQCUoAfikD0EAG7iA3AChQkKEohgANlwDGEM8CRx0OSAQDyAGigA5UhXYcXALwyGiYLvjuxLJkpN6GRrhQAEJIghYM4gQA0tR0jMwA1hAgAPYiUADCpejWcBD0qemZcH5QAN4GUFAA2pJC6FDZALoC-bT06ExQAOQARmkZM2pVNXUNEE0Z4n3DUAJmljZ2DY7OuARd3au19Y2LLbseV91bLQQAojTWFkiZOV5JKQJgUoFpdBJ1PMHssBF8fn8IACpMRiFc0QBfBIiJC1YCCGpQBbNcQsaQCN5ZeG-f7FMoVaq3DaUuBeaHNGaojpXO5nMEQADuN3W9xJcDJ3GYXHQIEMGIMBh+XDwzEZIs2D3E3O6XDJAmAAAtBMxOtcoLynFBDcbDN15Vc5nqrUaTS9zadLda8LaoPbusSMk68MA4MIENrrhbBjMRKVSjMffL7QGWmS2LrpGxHZmU2S9FAAPQFqClQoGFOknNpjNZh55wvF0vlzXinN16T5ovUOBwUpwZti6tp3Mdhvd3v9iutrPD9ud4viCcD7bTms1kfz8d95epqt72vNetdxfbqdD-fZg+B0fHnunlvn9PD2eHm8Lu9wIA
 * https://medium.com/@bensammons/building-a-fluent-interface-with-typescript-using-generics-in-typescript-3-4d206f00dba5
 */

type AddInput<Builder, InputName extends string> =
    Builder extends FormBuilderService<infer InputNames, infer ButtonNames>
    ? FormBuilderService<InputNames | InputName, ButtonNames>
    : never

type AddButton<Builder, ButtonName extends string> =
    Builder extends FormBuilderService<infer InputNames, infer ButtonNames>
    ? FormBuilderService<InputNames, ButtonNames | ButtonName>
    : never

type InferInputNames<Builder> =
    Builder extends FormBuilderService<infer InputNames>
    ? InputNames
    : never

class InputConfigBuilder<Builder> {

    _isRequired: boolean;
    _nameLabel: string;
    _inRelationWith: string;
    _type: InputComponents;
    _dataSource: DataSourceInput;
    _callbackComponent: OutputCallback;

    isRequired() {
        this._isRequired = true

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

    typeInput(type: InputComponents) {
        this._type = type

        return this
    }

    outputCallback(outputCallback: OutputCallback) {
        this._callbackComponent = outputCallback

        return this
    }
}

class ButtonConfigBuilder<Builder> {

    _isTypeSubmit: boolean;
    _callbackComponent: OutputCallback;

    isTypeSubmit(is: boolean = true) {
        this._isTypeSubmit = is

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
    public name: string;
    private currentForm: FormGroup;

    // submitCallback: Subject<any>;

    constructor(
        private fb: FormBuilder,
        private broadcastEventService: BroadcastEventService,
        private generateComponentViewService: GenerateComponentViewService
    ) {
        this.newForm()
    }

    set form(form: FormGroup) {
        this.currentForm = form;
    }

    get form(): FormGroup {
        return this.currentForm
    }

    newForm() {
        this.currentForm = this.fb.group({});

        return this.currentForm;
    }

    nameForm(name: string) {
        this.name = name;

        return this;
    }

    setViewContainerRef(containerRef: ViewContainerRef) {
        this.generateComponentViewService.setViewContainerRef(containerRef)

        return this;
    }

    /** v.1 */
    // addInput<InputName extends string, ReturnType extends AddInput<this, InputName>>(
    //     inputName: Exclude<InputName, InputNames>,
    //     inputLabel: string,
    //     type: InputTypes,
    //     dataSource?: DataSourceInput,
    //     callbackComponent?: OutputCallback
    // ): ReturnType {
    //     const configInputComponent: InputComponentInputs = { formGroup: this.currentForm, nameControl: inputName, nameLabel: inputLabel, dataSource: dataSource };
    //     this.generateComponentViewService.addComponentToView(type, configInputComponent, callbackComponent);
    //     return this as FormBuilderService as ReturnType;
    // }

    /** v.2 */
    // addInput<InputName extends NameControl, ReturnType extends AddInput<this, InputName>>(
    //     inputName: Exclude<InputName, InputNames>,
    //     cb: ConfigInputBuilder
    // ): ReturnType {

    //     const configInputComponent: InputComponentInputs = {
    //         formGroup: this.currentForm,
    //         nameControl: inputName,
    //         nameLabel: cb.config.input.nameLabel,
    //         dataSource: cb.config.input.dataSource,
    //         inRelationWith: cb.config.input.inRelationWith
    //     };

    //     this.generateComponentViewService.addComponentToView(cb.config.type, configInputComponent, cb.config.callbackComponent);

    //     return this as FormBuilderService as ReturnType;
    // }

    /** v.3 */
    addInput<InputName extends NameControl, ReturnType extends AddInput<this, InputName>>(
        inputName: Exclude<InputName, InputNames>,
        configBuilder: (b: InputConfigBuilder<this>) => InputConfigBuilder<this>
    ): ReturnType {

        const builder = configBuilder(new InputConfigBuilder);

        /** on formalise la configuration du champ input */
        const configInputComponent: InputComponentInputs = {
            formGroup: this.currentForm,
            nameControl: inputName,
            nameLabel: builder._nameLabel,
            dataSource: builder._dataSource,
            inRelationWith: builder._inRelationWith,
            validators: []
        };

        /** on traite la validation du champ input */

        if (builder._isRequired) {
            configInputComponent.validators.push(ValidatorsService.require)
        }

        this.generateComponentViewService.addComponentToView(builder._type, configInputComponent, builder._callbackComponent);

        return this as FormBuilderService as ReturnType;
    }

    /** v.1 */
    // addButton<ButtonName extends string, ReturnType extends AddButton<this, ButtonName>>(
    //     buttonName: Exclude<ButtonName, ButtonNames>,
    //     isTypeSubmit: boolean,
    //     callbackComponent?: OutputCallback
    // ): ReturnType {
    //     const configInputComponent: ButtonComponentInputs = {
    //         text: buttonName,
    //         type: isTypeSubmit ? TypeButtonEnum.SUBMIT : TypeButtonEnum.BUTTON,
    //         onClickSubmit: this.onClickSubmitCallback.bind(this)
    //     };

    //     this.generateComponentViewService.addComponentToView(InputComponents.BUTTON, configInputComponent, callbackComponent);

    //     return this as FormBuilderService as ReturnType;
    // }

    addButton<ButtonName extends string, ReturnType extends AddButton<this, ButtonName>>(
        buttonName: Exclude<ButtonName, ButtonNames>,
        configBuilder: (b: ButtonConfigBuilder<this>) => ButtonConfigBuilder<this>
    ): ReturnType {

        const builder = configBuilder(new ButtonConfigBuilder);

        const configInputComponent: ButtonComponentInputs = {
            text: buttonName,
            type: builder._isTypeSubmit ? TypeButtonEnum.SUBMIT : TypeButtonEnum.BUTTON,
            onClickSubmit: this.onClickSubmitCallback.bind(this)
        };

        this.generateComponentViewService.addComponentToView(InputComponents.BUTTON, configInputComponent, builder._callbackComponent);

        return this as FormBuilderService as ReturnType;
    }

    private onClickSubmitCallback() {
        this.broadcastEventService.broadcast({ eventCode: ConfigEvents.FORM_SUBMITTED, eventData: this.name })
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

    addComponentToView(componentType: InputComponents, configComponent: ConfigComponentInputs, callback: OutputCallback) {
        const componentToAdd = this.injectComponentService.returnComponentClassFromType(componentType);

        this.injectComponentService.loadAndAddComponentToContainer(componentToAdd, this.formContainerRef,
            [{ config: configComponent }],
            callback
        );
    }
}
