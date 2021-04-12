
export const configdefault = {
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
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
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
        toolbar: 'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat',
    }
}
