import { Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { InputComponents, InputTypes } from '../../shared/component/form';
import {
    ButtonComponentInputs,
    ConfigComponentInputs,
    InputComponentInputs,
    TypeButtonEnum,
} from '../model/component-inputs.model';
import { InjectComponentService } from './inject-component.service';

/**
 * https://www.typescriptlang.org/play?#code/C4TwDgpgBAggTgcwK4FsIDtgBVwQM4A8WAfFALxRZQQAewGAJnlABQB0HUAhongFxQAlugBmEOFACqASnKlhYiQCUoAfikD0EAG7iA3AChQkKEohgANlwDGEM8CRx0OSAQDyAGigA5UhXYcXALwyGiYLvjuxLJkpN6GRrhQAEJIghYM4gQA0tR0jMwA1hAgAPYiUADCpejWcBD0qemZcH5QAN4GUFAA2pJC6FDZALoC-bT06ExQAOQARmkZM2pVNXUNEE0Z4n3DUAJmljZ2DY7OuARd3au19Y2LLbseV91bLQQAojTWFkiZOV5JKQJgUoFpdBJ1PMHssBF8fn8IACpMRiFc0QBfBIiJC1YCCGpQBbNcQsaQCN5ZeG-f7FMoVaq3DaUuBeaHNGaojpXO5nMEQADuN3W9xJcDJ3GYXHQIEMGIMBh+XDwzEZIs2D3E3O6XDJAmAAAtBMxOtcoLynFBDcbDN15Vc5nqrUaTS9zadLda8LaoPbusSMk68MA4MIENrrhbBjMRKVSjMffL7QGWmS2LrpGxHZmU2S9FAAPQFqClQoGFOknNpjNZh55wvF0vlzXinN16T5ovUOBwUpwZti6tp3Mdhvd3v9iutrPD9ud4viCcD7bTms1kfz8d95epqt72vNetdxfbqdD-fZg+B0fHnunlvn9PD2eHm8Lu9wIA
 * https://medium.com/@bensammons/building-a-fluent-interface-with-typescript-using-generics-in-typescript-3-4d206f00dba5
 */

type AddInput<Builder, InputName extends string> =
    Builder extends FormBuilderService<infer InputNames>
    ? FormBuilderService<InputNames | InputName>
    : never

type AddButton<Builder, ButtonName extends string> =
    Builder extends FormBuilderService<infer ButtonNames>
    ? FormBuilderService<ButtonNames | ButtonName>
    : never

type CallbackKeys = "onComponentReady";

type CallbackFunction = {
    [key in CallbackKeys]: Function
}

@Injectable({
    providedIn: 'root',
})
export class FormBuilderService<InputNames extends string = never, ButtonNames extends string = never> {
    public name: string;
    private currentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private generateComponentViewService: GenerateComponentViewService
    ) {
        this.initForm();
    }

    set form(form: FormGroup) {
        this.currentForm = form;
    }

    get form(): FormGroup {
        return this.currentForm
    }

    initForm(): FormGroup {
        this.currentForm = this.fb.group({});

        return this.form;
    }

    nameForm(name: string) {
        this.name = name;

        return this;
    }

    setViewContainerRef(containerRef: ViewContainerRef) {
        this.generateComponentViewService.setViewContainerRef(containerRef);

        return this;
    }

    onInputReady(componentInputReadyCallback: Function) {
        this.generateComponentViewService.onInputReady(componentInputReadyCallback);

        return this;
    }

    addInput<InputName extends string, ReturnType extends AddInput<this, InputName>>(inputName: Exclude<InputName, InputNames>, inputLabel: string, type: InputTypes): ReturnType {
        this.currentForm.addControl(inputName, new FormControl());

        const configFieldForm: InputComponentInputs = { formGroup: this.currentForm, nameControl: inputName, nameLabel: inputLabel };

        this.generateComponentViewService.addComponentToView(type, configFieldForm);

        return this as FormBuilderService as ReturnType;
    }

    addButton<ButtonName extends string, ReturnType extends AddInput<this, ButtonName>>(buttonName: Exclude<ButtonName, ButtonNames>, isTypeSubmit: boolean): ReturnType {
        const configFieldForm: ButtonComponentInputs = { text: buttonName, type: isTypeSubmit ? TypeButtonEnum.SUBMIT : TypeButtonEnum.BUTTON };

        this.generateComponentViewService.addComponentToView(InputComponents.BUTTON, configFieldForm);

        return this as FormBuilderService as ReturnType;
    }
}

@Injectable({
    providedIn: 'root',
})
export class GenerateComponentViewService {
    private formContainerRef: ViewContainerRef;
    private componentInputReadyCallback: CallbackFunction[] = [];

    constructor(private injectComponentService: InjectComponentService) {
    }

    setViewContainerRef(containerRef: ViewContainerRef) {
        this.formContainerRef = containerRef;

        /** todo: à voir si je garde ça : faire plutôt une fonction d'ini */
        this.componentInputReadyCallback.splice(0, this.componentInputReadyCallback.length);

        console.log("componentInputReadyCallback", this.componentInputReadyCallback)

        return this;
    }

    onInputReady(componentInputReadyCallback: Function) {
        this.componentInputReadyCallback.push({ onComponentReady: componentInputReadyCallback });

        return this;
    }

    addComponentToView(componentType: InputTypes, componentConfig: ConfigComponentInputs) {
        const componentToAdd = this.injectComponentService.returnComponentClassFromType(componentType);

        this.injectComponentService.loadAndAddComponentToContainer(componentToAdd, this.formContainerRef,
            [{ config: componentConfig }],
            this.componentInputReadyCallback
        );
    }
}
