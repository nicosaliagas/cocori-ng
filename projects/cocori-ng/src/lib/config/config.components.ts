
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
            'help',
            'link',
            'image',
            'emoticons',
            'preview',
            'searchreplace',
            'media',
            'table',
            'paste',
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | emoticons ',
    }
}
