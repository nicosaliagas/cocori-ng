export interface FileModel {
    fileName: string,
    fileType?: FileType,
    id?: string,
    size?: number,
}

export type FileType = 'image' | 'doc'