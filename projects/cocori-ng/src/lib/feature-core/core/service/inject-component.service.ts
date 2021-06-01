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
    componentsRefs: any[] = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    /**
     * Exemple d'utilisation:
     
     * this.injectComponentService.loadAndAddComponentToContainer(MyClasseComponent, #DomReference,
            [{ @InputName_1: Value, @InputName_2: Value }], { @OutputName_1: (valueEmited: any) => this.callback(valueEmited)})
     * Ou si le composant n'a pas de @Output
     * this.injectComponentService.loadAndAddComponentToContainer(MyClasseComponent, #DomReference,
            [{ @InputName_1: Value, @InputName_2: Value }], null)
     */
    loadAndAddComponentToContainer(
        componentClass: any,
        viewContainerRef: ViewContainerRef,
        inputs: InputsComponent[] = [],
        outputs?: OutputsComponent,
        index?: number
    ) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentClass as any);
        const référenceComposant = viewContainerRef.createComponent(factory, index ? index : null);

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

        référenceComposant.changeDetectorRef.detectChanges();

        this.componentsRefs.push(référenceComposant)
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
