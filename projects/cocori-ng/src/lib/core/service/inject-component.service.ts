import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

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

    loadAndAddComponent(componentClass: any, viewContainerRef: ViewContainerRef, inputs: InputsComponent[] = [], outputs: OutputsComponent[] = []) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
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
