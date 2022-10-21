import { ConfigInputComponent } from './component-inputs.model';

export interface ConfigUploaderModel extends ConfigInputComponent {
    apiFile: (fileId?: string) => string;
    apiFileDownload: (fileId: string) => string;
}

export type ConfigAPIsFile = Partial<Pick<ConfigUploaderModel, 'apiFile' | 'apiFileDownload'>>;

export interface FileModel {
    description: string,
    fileName?: string,
    dateUpload?: Date,
    mimeType?: string,
    id?: string,
    size?: number,
}

export interface FileDetailsComponent {
    file: FileModel,
    apisFile: ConfigAPIsFile,
    component: any,
}

export interface NewFileCommand {
    fileName: string,
    numberParts: number,
    mimeType: string,
    base64Content: any,
}

export interface AssembleFilePartsCommand {
    fileId: string,
    checksum: string,
}

export interface FilePartCommand {
    fileId: string,
    partIndex: number,
    base64Content: any,
    mimeType: string,
}

export type FileType = 'image' | 'doc'

export type FileActions = 'browse' | 'remove'