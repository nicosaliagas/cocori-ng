import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';

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
    componentsRefs: any[] = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    /**
     * Exemple d'utilisation:
     
     * this.injectComponentService.loadAndAddComponentToContainer(MyClasseComponent, #DomReference,
            { @InputName_1: Value, @InputName_2: Value }, { @OutputName_1: (valueEmited: any) => this.callback(valueEmited)})
     * Ou si le composant n'a pas de @Output
     * this.injectComponentService.loadAndAddComponentToContainer(MyClasseComponent, #DomReference,
            { @InputName_1: Value, @InputName_2: Value }, null)
     */
    loadAndAddComponentToContainer(
        componentClass: Type<any>,
        viewContainerRef: ViewContainerRef,
        inputs: InputsComponent,
        outputs?: OutputsComponent,
        index?: number
    ) {
        // const factory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const componentRef = viewContainerRef.createComponent(componentClass, { index: index ? index : null });

        /** inputs */
        for (const [key, value] of Object.entries(inputs)) {
            (componentRef.instance)[key] = value;
        }

        /** outputs */
        if (outputs) {
            for (const [key, value] of Object.entries(outputs)) {
                if (key && value && (componentRef.instance)[key]) (componentRef.instance)[key].subscribe(data => value(data));
            }
        }

        componentRef.changeDetectorRef.detectChanges();

        this.componentsRefs.push(componentRef);
    }

    removeComponentFromViewContainer(index: number, viewContainerRef: ViewContainerRef) {
        viewContainerRef.remove(index);

        this.componentsRefs.splice(index, 1);
    }

    moveComponentFromViewContainer(currentIndex: number, previousIndex: number, viewContainerRef: ViewContainerRef) {
        viewContainerRef.move(viewContainerRef.get(previousIndex), currentIndex);

        this.componentsRefs.splice(previousIndex, 0, this.componentsRefs.splice(currentIndex, 1)[0]);
    }
}
