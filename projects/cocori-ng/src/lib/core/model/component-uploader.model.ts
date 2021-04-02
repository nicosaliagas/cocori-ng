import { DataSourceInput } from './data-source.model';

export interface ConfigUploaderModel {
    label: string,
    apiFile: (fileId?: string) => string;
    apiFileDownload: (fileId: string) => string;
    dataSource: DataSourceInput,
}

export type ConfigAPIsFile = Pick<ConfigUploaderModel, 'apiFile' | 'apiFileDownload'>;

export interface FileModel {
    description: string,
    fileName: string,
    dateUpload?: Date,
    fileType?: FileType,
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
}

export type FileType = 'image' | 'doc'

export type FileActions = 'browse' | 'remove'