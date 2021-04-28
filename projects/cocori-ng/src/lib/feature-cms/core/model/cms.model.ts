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
    backgroundColor: string,
    content: EditorValues
}

export interface SectionModel {
    idSection: string,
    block: Block,
    values: EditorValues,
    backgroundColor: string
}

export interface EditorValues {
    [key: string]: string;
}

export interface ContentDescriptionSection {
    texte: string,
}

export interface InsertSectionAt {
    section: SectionModel
    index?: number,
}

export interface BottomSheetSectionReturnAction {
    action: BottomSheetSectionActions
    value: any
}

export type BottomSheetSectionActions = 'duplicate' | 'remove' | 'backgroundColor'
