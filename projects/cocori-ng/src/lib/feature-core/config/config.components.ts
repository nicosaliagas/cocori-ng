
export const DefaultConfigComponent = {
    form: {
        keyId: "formId",
        appearance: 'outline',
        styleCompact: false
    },
    button: {
        text: "Valider"
    },
    date: {
        dateTimeSeparator: ' à '
    },
    upload: {
        chunkSize: 2 * 1048576
    },
    wysiwyg: {
        plugins: [
            'quickbars',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'media',
            'imagetools',
            'emoticons',
            'preview',
            'searchreplace',
            'media',
            'table',
            'paste',
            'code',
            'help',
        ],
        toolbar: 'undo redo | bullist numlist | imageoptions media | quicklink | quicktable | emoticons',
        quickbars: 'bullist numlist | imageoptions media | quicklink | quicktable | emoticons'
    }
}
