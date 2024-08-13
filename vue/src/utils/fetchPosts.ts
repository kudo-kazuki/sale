import { axiosInstance } from '@/axiosConfig'
import { Post } from '@/types'

interface FetchPostsOptions {
    id?: string
    searchWord?: string
    perPage?: number
    page?: number
    order?: 'asc' | 'desc'
    orderBy?: string
    categories?: number[]
}

interface FetchPostsResult {
    posts: Post[]
    total: number
}

//単一記事を取得する関数
export const fetchPostById = async (id: string): Promise<Post> => {
    try {
        const response = await axiosInstance.get<Post>(`posts/${id}`)
        let post = response.data
        post = await fetchFeaturedMedia(post)
        return post
    } catch (error) {
        console.error(`Error fetching WordPress post with ID ${id}:`, error)
        throw error
    }
}

//記事一覧を取得する関数
export const fetchPosts = async (
    options: FetchPostsOptions = {},
): Promise<FetchPostsResult> => {
    try {
        const { searchWord, perPage, order, orderBy, categories, page } =
            options
        let url = 'posts'

        const params = new URLSearchParams()
        params.append('acf_format', 'standard')

        if (searchWord) params.append('search', searchWord)
        if (perPage) params.append('per_page', perPage.toString())
        if (page) params.append('page', page.toString())
        if (order) params.append('order', order)
        if (orderBy) params.append('orderby', orderBy)
        if (categories && categories.length > 0) {
            params.append('categories', categories.join(','))
        }

        if (params.toString()) {
            url += `?${params.toString()}`
        }

        console.log('url:', url)

        const response = await axiosInstance.get<Post[]>(url)
        const postData = response.data
        const total = parseInt(response.headers['x-wp-total'], 10) //pageやper_pageを無視したトータル件数

        const postsWithMedia = await Promise.all(
            postData.map(fetchFeaturedMedia),
        )

        return { posts: postsWithMedia, total }
    } catch (error) {
        console.error('Error fetching WordPress posts:', error)
        throw error
    }
}

//メディア情報を取得する共通関数
export const fetchFeaturedMedia = async (post: Post): Promise<Post> => {
    if (post.featured_media) {
        try {
            const mediaResponse = await axiosInstance.get(
                `media/${post.featured_media}`,
            )
            post.featured_media_details = mediaResponse.data
        } catch (mediaError) {
            console.error(
                `Error fetching media for post ${post.id}:`,
                mediaError,
            )
        }
    }
    return post
}
