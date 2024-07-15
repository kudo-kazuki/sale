export function updateMeta(title: string, description: string) {
    if (title) {
        document.title = title
    }

    const descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
        descriptionMeta.setAttribute('content', description)
    } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = description
        document.getElementsByTagName('head')[0].appendChild(meta)
    }
}
