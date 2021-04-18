import { Injectable } from '@angular/core';
import { CommandMappings } from '@cocori-ng/lib/src/lib/feature-core';

interface ParamsMapping {
    mappingName: string;
    mappingKeys: string[];
}

type valueType = string | number | Date

@Injectable()
export class MappingBuilderService {
    private nameForm: string;
    private values: any;
    private commandMapped: Object = {};

    constructor() { }

    init() {
        this.commandMapped = {}

        return this
    }

    set setNameForm(name: string) {
        this.nameForm = name;
    }

    set valuesForm(values: any) {
        this.values = values;
    }

    map(mapping: CommandMappings) {
        const sourceMap: ParamsMapping = this.extractMappingParams(mapping.source);
        const sourceValue: valueType = this.getValueFromMapping(sourceMap);

        const destinationMap: ParamsMapping = this.extractMappingParams(mapping.destination);

        /** sourceValue est undefined si la clé du formulaire est inconnu */
        if (typeof sourceValue !== 'undefined') {
            this.assign(this.commandMapped, destinationMap.mappingKeys, sourceValue)
        }

        return this
    }

    getMapping() {
        return Object.entries(this.commandMapped).length === 0 ? null : this.commandMapped
    }

    private extractMappingParams(mapping: string): ParamsMapping {
        const m: string[] = mapping.split('.')
        const [firstElement, ...rest] = m

        return <ParamsMapping>{ mappingName: firstElement, mappingKeys: rest }
    }

    private getValueFromMapping(source: ParamsMapping): valueType {
        let value: valueType = null

        if (this.nameForm === source.mappingName) {
            source.mappingKeys.forEach((key: string) => {
                value = value ? value[key] : ((key in this.values) ? this.values[key] : null)
            })

            return value
        }

        return undefined
    }

    private assign(obj: Object, keyPath: string[], value: valueType) {
        let key
        let lastKeyIndex = keyPath.length - 1;

        for (var i = 0; i < lastKeyIndex; ++i) {
            key = keyPath[i];

            if (!(key in obj)) {
                obj[key] = {}
            }

            obj = obj[key];
        }

        obj[keyPath[lastKeyIndex]] = value;
    }
}

