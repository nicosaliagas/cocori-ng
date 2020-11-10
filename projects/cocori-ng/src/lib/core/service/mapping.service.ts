import { Injectable } from '@angular/core';

import { CommandMappings } from '../model/schema-datas.model';

interface ParamsMapping {
    mappingName: string;
    mappingKey: string;
}

interface SourceParamsMapping {
    mappingName: string;
    mappingKeys: string[];
}

type mapEntry = {
    [key in string]: valueType
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
        const sourceMap: SourceParamsMapping = this.extractMappingSource(mapping.source);
        const sourceValue: valueType = this.getValueFromMapping(sourceMap);

        const destinationMap: ParamsMapping = this.extractMappingParams(mapping.destination);

        if (typeof sourceValue !== "undefined") {
            this.commandMapped[destinationMap.mappingKey] = sourceValue
        }

        return this
    }

    getMapping() {
        return this.commandMapped
    }

    private extractMappingSource(mapping: string): SourceParamsMapping {
        const m: string[] = mapping.split('.')
        const firstElement: string = m.shift()

        return <SourceParamsMapping>{ mappingName: firstElement, mappingKeys: m }
    }

    private extractMappingParams(mapping: string): ParamsMapping {
        const m: string[] = mapping.split('.')

        return <ParamsMapping>{ mappingName: m[0], mappingKey: m[1] }
    }

    private getValueFromMapping(source: SourceParamsMapping): valueType {
        if (this.name === source.mappingName) {

            let t: any

            source.mappingKeys.forEach((key: string) => {
                t = t ? t[key] : this.values[key]
            })

            return t
        }

        return undefined
    }
    // private getValueFromMapping(source: ParamsMapping): valueType {
    //     if (this.name === source.mappingName) {
    //         if (source.mappingKey in this.values) {
    //             return this.values[source.mappingKey]
    //         }
    //     }

    //     return undefined
    // }
}

