import { Injectable } from '@angular/core';

import { CommandMappings } from '../model/schema-datas.model';

interface ParamsMapping {
    mappingName: string;
    mappingKey: string;
}

interface ParamsMapping {
    mappingName: string;
    mappingKeys: string[];
}

type mapEntry = {
    [key in string]: any
}

type valueType = string | number | Date

@Injectable()
export class MappingBuilderService {
    private name: string;
    private values: any;
    private commandMapped: mapEntry = {};

    constructor() { }

    init() {
        this.commandMapped = {}

        return this
    }

    set nameForm(name: string) {
        this.name = name;
    }

    set valuesForm(values: any) {
        this.values = values;
    }

    map(mapping: CommandMappings) {
        const sourceMap: ParamsMapping = this.extractMappingParams(mapping.source);
        const sourceValue: valueType = this.getValueFromMapping(sourceMap);

        const destinationMap: ParamsMapping = this.extractMappingParams(mapping.destination);

        if (typeof sourceValue !== "undefined") {
            this.assign(this.commandMapped, destinationMap.mappingKeys, sourceValue)
        }

        return this
    }

    getMapping() {
        return this.commandMapped
    }

    private extractMappingParams(mapping: string): ParamsMapping {
        const m: string[] = mapping.split('.')
        const [firstElement, ...rest] = m

        return <ParamsMapping>{ mappingName: firstElement, mappingKeys: rest }
    }

    private getValueFromMapping(source: ParamsMapping): valueType {
        if (this.name === source.mappingName) {

            let value: any

            source.mappingKeys.forEach((key: string) => {
                value = value ? value[key] : this.values[key]
            })

            return value
        }

        return undefined
    }

    assign(obj: mapEntry, keyPath: string[], value: valueType) {
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

