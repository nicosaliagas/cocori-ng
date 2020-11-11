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
        expect(mappingBuilderService.getMapping()).toEqual({})
    });

    it(`trouver un bloc widgets qui suit un bloc donné`, () => {
        mappingBuilderService.nameForm = "test"
        mappingBuilderService.valuesForm = { key: "one" }

        const commandMappings = [
            {
                "source": "test.key",
                "destination": "command.nom"
            }
        ]

        commandMappings.forEach((mapping: CommandMappings) => {
            mappingBuilderService.map(mapping)
        })

        expect(mappingBuilderService.getMapping()).toEqual({ nom: "one" })
    });

    // it(`trouver un bloc widgets qui suit un bloc donné`, () => {
    //     expect(mappingBuilderService.blocWidgetsSuivant('id0')).toBeNull();
    //     expect(mappingBuilderService.blocWidgetsSuivant('id1').id).toEqual('id2');
    //     expect(mappingBuilderService.blocWidgetsSuivant('id3').id).toEqual('id4');
    //     expect(mappingBuilderService.blocWidgetsSuivant('id4')).toBeNull();
    // });

    // it(`je mets ma page en mode modification`, () => {
    //     expect(mappingBuilderService.contenu.mode).toEqual(ModeEntité.création);
    //     mappingBuilderService.mettrePageModeModification();
    //     expect(mappingBuilderService.contenu.mode).toEqual(ModeEntité.modification);
    // });
})

