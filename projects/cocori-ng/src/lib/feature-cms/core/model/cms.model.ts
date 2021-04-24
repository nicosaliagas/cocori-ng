import { ConfigWysiwygModel } from '@cocori-ng/lib/src/lib/feature-core';

import { Block } from '../service/block';

/** configuration par défaut du wysiwyg pour être utilisé dans les sections */
export type WysiwygSectionCmsModel = Pick<ConfigWysiwygModel, 'apiKey' | 'apiFile' | 'apiFileDownload'>;

/** configuration du cms */
export interface ConfigCmsModel {
    wysiwygOptions: WysiwygSectionCmsModel,
}

export interface BlockDatasModel {
    idBlock: string,
    filename: string,
    label: string,
    content: ContentDescriptionSection
}

export interface SectionModel {
    idSection: string,
    block: Block,
    values: SectionValue[] /** mettre un type avec id et valeur */
}

export interface SectionValue {
    [key: string]: string;
}

// export interface SectionValue {
//     editorId: string,
//     value: any
// }

export interface ContentDescriptionSection {
    texte: string,
}

export interface InsertSectionAt {
    section: SectionModel
    index?: number,
}

export type BottomSheetSectionActions = 'duplicate' | 'remove'
