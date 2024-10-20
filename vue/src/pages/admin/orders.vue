<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { formatDateTime } from '@/utils/dateFormatter'
import Pagination from '@/components/Pagination/Pagination.vue'

interface Order {
    id: number
    orderNo: string
    name: string
    email: string
    orderItems: string
    question: string
    remarks: string
    status: number
    created_at: string // もしくはDate型
}

const STATUS_TEXT: Record<number, string> = {
    0: '準備中',
    1: '送付済',
    2: '準備完了',
    3: 'キャンセル',
}

const MAX_DISPLAY_PAGES = 10
const ITEMS_PER_PAGE = 30
const orders = ref<Order[]>([])
const page = ref(1)
const totalPages = ref(1)
const total = ref(0)
const sortColumn = ref('id')
const sortOrder = ref('desc')

const fetchOrders = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/orders.php`, {
        params: {
            page: page.value,
            sort: sortColumn.value,
            order: sortOrder.value,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        },
    })
    console.log('response', response)
    orders.value = response.data.data
    total.value = response.data.total
    totalPages.value = Math.ceil(total.value / ITEMS_PER_PAGE) // 30件ごとにページを分ける
}

const sortBy = (column: string) => {
    if (sortColumn.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc' // 同じカラムなら昇順と降順を切り替え
    } else {
        sortColumn.value = column
        sortOrder.value = 'desc' // 新しいカラムをソートするときは降順
    }
    fetchOrders() // ソートを変更したら再取得
}

const prevPage = () => {
    if (page.value > 1) {
        page.value--
        fetchOrders()
    }
}

const nextPage = () => {
    if (page.value < totalPages.value) {
        page.value++
        fetchOrders()
    }
}

const movePage = (pageNumber: number) => {
    page.value = pageNumber
    fetchOrders()
}

// ページロード時にデータを取得
onMounted(() => {
    fetchOrders()
})
</script>

<template>
    <section class="Page">
        <h1>注文一覧</h1>

        <div class="Page__tableWrap">
            <table class="Page__table">
                <thead>
                    <tr>
                        <th>
                            注文番号<button
                                class="Page__sortButton"
                                @click="sortBy('orderNo')"
                            ></button>
                        </th>
                        <th>
                            名前<button
                                class="Page__sortButton"
                                @click="sortBy('name')"
                            ></button>
                        </th>
                        <th>
                            メールアドレス<button
                                class="Page__sortButton"
                                @click="sortBy('email')"
                            ></button>
                        </th>
                        <th>
                            注文商品<button
                                class="Page__sortButton"
                                @click="sortBy('orderItems')"
                            ></button>
                        </th>
                        <th>
                            質問<button
                                class="Page__sortButton"
                                @click="sortBy('question')"
                            ></button>
                        </th>
                        <th>
                            備考<button
                                class="Page__sortButton"
                                @click="sortBy('remarks')"
                            ></button>
                        </th>
                        <th>
                            状態<button
                                class="Page__sortButton"
                                @click="sortBy('status')"
                            ></button>
                        </th>
                        <th>
                            注文日時<button
                                class="Page__sortButton"
                                @click="sortBy('created_at')"
                            ></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="order in orders"
                        :key="order.id"
                        :data-id="order.id"
                    >
                        <td>{{ order.orderNo }}</td>
                        <td>{{ order.name }}</td>
                        <td>{{ order.email }}</td>
                        <td>
                            <ul v-if="order.orderItems.length">
                                <li
                                    v-for="orderItem in order.orderItems.split(
                                        ',',
                                    )"
                                    :key="orderItem"
                                >
                                    <a
                                        :href="`/detail/${orderItem}`"
                                        target="_blank"
                                        >{{ orderItem }}</a
                                    >
                                </li>
                            </ul>
                        </td>
                        <td>
                            <pre>{{ order.question }}</pre>
                        </td>
                        <td>
                            <pre>{{ order.remarks }}</pre>
                        </td>
                        <td>{{ STATUS_TEXT[order.status] }}</td>
                        <td>{{ formatDateTime(order.created_at) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination
            :currentPage="page"
            :maxDisplayPages="MAX_DISPLAY_PAGES"
            :itemsPerPage="ITEMS_PER_PAGE"
            :total="total"
            @onClick:pageNumber="movePage"
        />
    </section>
</template>

<style lang="scss" scoped>
.Page {
    h1 {
        padding: 8px 12px;
    }

    &__sortButton {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #000;
    }

    &__tableWrap {
        width: 100%;
        overflow-x: auto;
    }

    &__table {
        width: 100%;
        table-layout: fixed;

        thead {
            tr {
                th {
                    background-color: #224fe4;
                    color: #fff;
                    font-weight: bold;
                    padding: 8px 12px;
                    position: sticky;
                    top: 0;

                    &:first-child {
                        width: 160px;
                    }

                    &:nth-child(2) {
                        width: 170px;
                    }

                    &:nth-child(3) {
                        width: 300px;
                    }

                    &:nth-child(4) {
                        width: 100px;
                    }

                    &:nth-child(5) {
                        width: 200px;
                    }

                    &:nth-child(6) {
                        width: 200px;
                    }

                    &:nth-child(7) {
                        width: 90px;
                    }

                    &:last-child {
                        width: 170px;
                    }
                }
            }
        }

        tbody {
            tr {
                &:hover {
                    background-color: #fffcf6;
                }

                td {
                    border-bottom: 1px solid #bebaba;
                    padding: 12px 20px;
                }
            }
        }
    }

    pre {
        white-space: pre-line;
    }
}
</style>
