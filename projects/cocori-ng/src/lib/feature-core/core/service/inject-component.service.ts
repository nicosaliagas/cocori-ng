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
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    loadAndAddComponentToContainer(
        componentClass: any,
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
    }
}
