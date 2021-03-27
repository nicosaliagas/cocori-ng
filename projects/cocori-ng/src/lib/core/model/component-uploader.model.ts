import { DataSourceInput } from './data-source.model';

export interface ConfigUploaderModel {
    label: string,
    dataSource: DataSourceInput,
}

export interface FileModel {
    description: string,
    fileName: string,
    fileType?: FileType,
    id?: string,
    size?: number,
}

export type FileType = 'image' | 'doc'

export type FileActions = 'view' | 'browse' | 'remove'