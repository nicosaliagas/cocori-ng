import { Type } from '@angular/core';
import { ConfigWysiwygModel } from '@cocori-ng/lib/src/lib/feature-core';

import { Block } from '../service/block';

export type ResponsiveOrientation = 'computer' | 'tablet-land' | 'tablet-port' | 'mobile'

export type OrientationParamsTpl = { [type in ResponsiveOrientation]: Function};

/** configuration par défaut du wysiwyg pour être utilisé dans les sections */
export type ApisConfigCmsModel = Pick<ConfigWysiwygModel, 'apiKey' | 'apiFile' | 'apiFileDownload'>;

/** configuration du CMS */
export interface ConfigCmsModel {
    component: Type<any>,
    blocks: Block[], 
    wysiwygOptions: ApisConfigCmsModel,
}

/** identité d'un block */
export interface BlockDatasModel {
    idBlock: string,
    label: string,
    backgroundColor: string,
    filename: string,
    content: EditorValues
}

/** le block sélectionné depuis la collection de templates devient une section */
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

export interface SectionMoveIndexes {
    currentIndex: number
    previousIndex: number
}

export type BottomSheetSectionActions = 'duplicate' | 'remove' | 'backgroundColor' | 'move-up' | 'move-down'

export type MoveOrientationSectionActions = 'move-up' | 'move-down'
