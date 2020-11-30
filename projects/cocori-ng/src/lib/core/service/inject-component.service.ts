import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

import { ClasseComponents, InputComponents } from '../../shared/component/form';

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

    returnComponentClassFromType(typeOfComponent: InputComponents) {
        if (!ClasseComponents.hasOwnProperty(typeOfComponent)) {
            const error: string = `This type of component : '${typeOfComponent}' doesn't exist`;
            throw new Error(error);
        } else {
            return ClasseComponents[typeOfComponent];
        }
    }

    // returnComponentClassFromType<T extends InputComponents, ReturnType extends InputClassesTypes<T>>(typeOfComponent: InputComponents): ReturnType {
    //     if (!ClasseComponents.hasOwnProperty(typeOfComponent)) {
    //         const error: string = `This type of component : '${typeOfComponent}' doesn't exist`;
    //         throw new Error(error);
    //     } else {
    //         return ClasseComponents[typeOfComponent] as unknown as ReturnType;
    //     }
    // }

    loadAndAddComponentToContainer<T extends InputComponents>(
        componentClass: typeof ClasseComponents[T],
        viewContainerRef: ViewContainerRef,
        inputs: InputsComponent[] = [],
        outputs?: OutputsComponent
    ) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentClass as any);
        const référenceComposant = viewContainerRef.createComponent(factory);

        inputs.forEach((input: InputsComponent) => {
            for (const [key, value] of Object.entries(input)) {
                (référenceComposant.instance)[key] = value;
            }
        });

        if (outputs) {
            for (const [key, value] of Object.entries(outputs)) {
                if (key && value && (référenceComposant.instance)[key]) (référenceComposant.instance)[key].subscribe(data => value(data));
            }
        }

        // outputs.forEach((output: OutputsComponent) => {
        //     for (const [key, value] of Object.entries(output)) {
        //         (référenceComposant.instance)[key].subscribe(data => value(data));
        //     }
        // });

        référenceComposant.changeDetectorRef.detectChanges();

        this.référencesComposants.push(référenceComposant);
    }
}
