import { ConfigWysiwygModel } from '@cocori-ng/lib/src/lib/feature-core';

/** configuration par défaut du wysiwyg pour être utilisé dans les sections */
export type WysiwygSectionCmsModel = Pick<ConfigWysiwygModel, 'apiKey' | 'apiFile' | 'apiFileDownload'>;

/** configuration du cms */
export interface ConfigCmsModel {
    wysiwygOptions: WysiwygSectionCmsModel,
}

export interface BlockModel {
    idBlock: string,
    filename: string,
    label: string,
    content: ContentDescriptionSection
}

export interface SectionModel {
    idSection: string,
    block: BlockModel,
    values: any[]
}

export interface ContentDescriptionSection {
    texte: string,
}

export interface InsertSectionAt {
    section: SectionModel
    index?: number,
}

export type BottomSheetSectionActions = 'duplicate' | 'remove'
