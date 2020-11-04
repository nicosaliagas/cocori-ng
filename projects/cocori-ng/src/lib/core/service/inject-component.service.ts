import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

import { ClasseComponents, InputClassesTypes, InputTypes } from '../../shared/component/form';

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

    returnComponentClassFromType<T extends InputTypes, ReturnType extends InputClassesTypes<T>>(typeOfComponent: InputTypes): ReturnType {
        if (!ClasseComponents.hasOwnProperty(typeOfComponent)) {
            const error: string = `This type of component : '${typeOfComponent}' doesn't exist`;
            throw new Error(error);
        } else {
            return ClasseComponents[typeOfComponent] as unknown as ReturnType;
        }
    }

    loadAndAddComponentToContainer<T extends InputTypes>(componentClass: InputClassesTypes<T>, viewContainerRef: ViewContainerRef, inputs: InputsComponent[] = [], outputs: OutputsComponent[] = []) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentClass as any);
        const référenceComposant = viewContainerRef.createComponent(factory);

        inputs.forEach((input: InputsComponent) => {
            for (const [key, value] of Object.entries(input)) {
                (référenceComposant.instance)[key] = value;
            }
        });

        /** todo: tester si la prop output existe */
        outputs.forEach((output: OutputsComponent) => {
            for (const [key, value] of Object.entries(output)) {
                (référenceComposant.instance)[key].subscribe(data => value(data));
            }
        });

        référenceComposant.changeDetectorRef.detectChanges();

        this.référencesComposants.push(référenceComposant);
    }
}
