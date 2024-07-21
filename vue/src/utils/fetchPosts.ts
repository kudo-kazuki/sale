import axiosInstance from '@/axiosConfig'
import { Post } from '@/types'

interface FetchPostsOptions {
    searchWord?: string
    perPage?: number
    order?: 'asc' | 'desc'
    orderBy?: string
    categories?: number[]
}

export const fetchPosts = async (
    options: FetchPostsOptions = {},
): Promise<Post[]> => {
    try {
        const { searchWord, perPage, order, orderBy, categories } = options
        let url = 'posts'

        const params = new URLSearchParams()
        if (searchWord) params.append('search', searchWord)
        if (perPage) params.append('per_page', perPage.toString())
        if (order) params.append('order', order)
        if (orderBy) params.append('orderby', orderBy)
        if (categories && categories.length > 0) {
            params.append('categories', categories.join(','))
        }

        if (params.toString()) {
            url += `?${params.toString()}`
        }

        const response = await axiosInstance.get<Post[]>(url)
        const postData = response.data

        const postsWithMedia = await Promise.all(
            postData.map(async (post) => {
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
            }),
        )

        return postsWithMedia
    } catch (error) {
        console.error('Error fetching WordPress posts:', error)
        throw error
    }
}
