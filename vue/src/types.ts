export interface Post {
    id: number
    date: string
    modified: string
    title: {
        rendered: string
    }
    content: {
        protected?: boolean
        rendered: string
    }
    excerpt?: {
        protected?: boolean
        rendered: string
    }
    slug: string
    status: string
    sticky?: boolean
    type: string
    comment_status?: string
    categories?: Array<number | string>
    format?: string
    featured_media?: number | string
    link?: string
}

export interface Category {
    id: number
    count: number
    description: string
    link: string
    meta: string[]
    name: string
    parent: number
    slug: string
    taxonomy: string
}
