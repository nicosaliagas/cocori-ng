import { CommandMappings } from '../model/schema-datas.model';
import { MappingBuilderService } from './mapping.service';

describe('Service : MappingBuilder', () => {
    let mappingBuilderService: MappingBuilderService;

    beforeEach(() => {
        mappingBuilderService = new MappingBuilderService();
    });

    afterEach(() => {
        mappingBuilderService = null;
    });

    it('la classe service doit être correctement instanciée', () => {
        expect(mappingBuilderService).toBeTruthy();
        expect(mappingBuilderService.getMapping()).toBeNull()
    });

    it(`il n'y a pas de nom de formulaire défini`, () => {
        mappingBuilderService.valuesForm = {}

        const commandMappings = []

        commandMappings.forEach((mapping: CommandMappings) => {
            mappingBuilderService.map(mapping)
        })

        expect(mappingBuilderService.getMapping()).toBeNull()
    });

    it(`il n'y a pas de règle de mapping définie`, () => {
        mappingBuilderService.setNameForm = "form"
        mappingBuilderService.valuesForm = {}

        const commandMappings = []

        commandMappings.forEach((mapping: CommandMappings) => {
            mappingBuilderService.map(mapping)
        })

        expect(mappingBuilderService.getMapping()).toBeNull()
    });

    it(`le nom du formulaire ne correspond pas à celui du mapping`, () => {
        mappingBuilderService.setNameForm = "unknownTest"
        mappingBuilderService.valuesForm = {}

        const commandMappings = [
            {
                "source": "test.key",
                "destination": "command.keyValue"
            }
        ]

        commandMappings.forEach((mapping: CommandMappings) => {
            mappingBuilderService.map(mapping)
        })

        expect(mappingBuilderService.getMapping()).toBeNull()
    });

    it(`génère correctement l'objet commande`, () => {
        mappingBuilderService.setNameForm = "test"
        mappingBuilderService.valuesForm = { key: "keyone", key2: "keytwo", key3: "keytrois" }

        const commandMappings = [
            {
                "source": "test.key",
                "destination": "command.keyValue"
            },
            {
                "source": "test.key2",
                "destination": "command.keyValue"
            },
            {
                "source": "test.unknownKey",
                "destination": "command.unknownValue"
            },
            {
                "source": "test.key2",
                "destination": "command.prop.subprop.key2Value"
            },
            {
                "source": "test.key3",
                "destination": "command.prop.subprop.key3Value"
            }
        ]

        commandMappings.forEach((mapping: CommandMappings) => {
            mappingBuilderService.map(mapping)
        })

        expect(mappingBuilderService.getMapping()).toEqual({ keyValue: "keytwo", unknownValue: null, prop: { subprop: { key2Value: "keytwo", key3Value: "keytrois" } } })
    });
})

