import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

import { Field, FieldType, ListOfComponents } from '../../shared/component/form';

export interface InputsComponent {
    [key: string]: any;
}

export interface OutputsComponent {
    [key: string]: Function;
}

@Injectable({
    providedIn: 'root',
})
export class InjectComponentService {
    private référencesComposants: any[] = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    returnComponentClassFromType<T extends FieldType, ReturnType extends Field<T>>(typeOfComponent: FieldType): ReturnType {
        if (!ListOfComponents.hasOwnProperty(typeOfComponent)) {
            const error: string = `This type of component : '${typeOfComponent}' doesn't exist`;
            throw new Error(error);
        } else {
            return ListOfComponents[typeOfComponent] as unknown as ReturnType;
        }
    }

    loadAndAddComponentToContainer<T extends FieldType>(componentClass: Field<T>, viewContainerRef: ViewContainerRef, inputs: InputsComponent[] = [], outputs: OutputsComponent[] = []) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentClass as any);
        const référenceComposant = viewContainerRef.createComponent(factory);

        inputs.forEach((input: InputsComponent) => {
            for (const [key, value] of Object.entries(input)) {
                (référenceComposant.instance)[key] = value;
            }
        });

        outputs.forEach((output: OutputsComponent) => {
            for (const [key, value] of Object.entries(output)) {
                (référenceComposant.instance)[key].subscribe(data => value(data));
            }
        });

        référenceComposant.changeDetectorRef.detectChanges();

        this.référencesComposants.push(référenceComposant);
    }
}
