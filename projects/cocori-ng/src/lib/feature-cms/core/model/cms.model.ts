export interface BlockModel {
    idBlock: string,
    filename: string,
    label: string,
    content: ContentDescriptionSection
}

export interface SectionModel {
    idSection: string,
    block: BlockModel,
}

export interface ContentDescriptionSection {
    texte: string,
}
