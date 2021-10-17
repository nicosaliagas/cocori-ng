import { Type } from '@angular/core';
import { ConfigWysiwygModel } from '@cocori-ng/lib/src/lib/feature-core';

import { Block } from '../service/block';

export type ResponsiveOrientation = 'computer' | 'tablet-land' | 'tablet-port' | 'mobile'

export type OrientationParamsTpl = { [type in ResponsiveOrientation]: Function};

/** configuration par défaut du wysiwyg pour être utilisé dans les sections */
export type ApisConfigCmsModel = Pick<ConfigWysiwygModel, 'apiKey' | 'apiFile' | 'apiFileDownload'>;

/** configuration du CMS */
export interface ConfigCmsModel {
    catalog: Block[], 
    wysiwygOptions: ApisConfigCmsModel,
}

/** identité d'un block */
export interface BlockModel {
    label: string,
    component: Type<any>,
    filename: string,
    backgroundColor: string,
    content: EditorValues
}

export interface SectionModel {
    id: string,
    key: string,
    component: Type<any>,
    componentReadonly: Type<any>,
    backgroundColor: string,
    values: EditorValues,
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
