import { ConfigUploaderModel } from './component-uploader.model';

export interface ConfigWysiwygModel extends ConfigUploaderModel {
    apiKey: string;
    params?: InitWysiwyg
}

export interface WysiwygConfigSection {
    [key: string]: ConfigWysiwygModel;
}

export interface InitWysiwyg {
    height?: number;
    menubar?: boolean;
    inline?: boolean;
    plugins?: PluginsAvailable[];
    toolbar?: ToolbarOptions[][];
    quickbars?: ToolbarOptions[][];
}

export type PluginsAvailable = 'advlist' | 'autolink' | 'lists' | 'link' | 'image' | 'charmap' | 'print' | 'preview' | 'anchor' | 'searchreplace' | 'visualblocks' | 'code' | 'fullscreen' | 'insertdatetime' | 'media' | 'table' | 'paste' | 'code' | 'help' | 'wordcount'

export type ToolbarOptions = 'undo' | 'redo' | 'formatselect' | 'bold' | 'italic' | 'backcolor' | 'alignleft' | 'aligncenter' | 'alignright' | 'alignjustify' | 'bullist' | 'numlist' | 'outdent' | 'indent' | 'removeformat' | 'help'
