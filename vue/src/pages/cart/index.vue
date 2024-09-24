<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useCsrfStore } from '@/stores/csrfStore'
import { updateMeta } from '@/utils/meta'
import { BreadcrumbsItem } from '@/types'
import axios from 'axios'
import { format } from 'date-fns'
import { API_BASE_URL, ENVIROMENT_NAME } from '@/config'
import CartItems from '@/components/Cart/CartItems.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'

const csrfStore = useCsrfStore()
const router = useRouter()

updateMeta('カート', 'カート')

const breadcrumbsItems = ref<Array<BreadcrumbsItem>>([
    {
        text: 'カート',
    },
])

const cartStore = useCartStore()
console.log('cartStore.items', cartStore.items)

const isOpenOrder = ref(false)
const openOrder = () => {
    isOpenOrder.value = true
}
const closeOrder = () => {
    isOpenOrder.value = false
}

const MAX_QUESTION_LENGTH = 500
const inputData = ref({
    name: 'aaaa',
    email: 'aaa@aa.jp',
    question: '',
})

const nameErrorText = ref('')
const validateName = () => {
    nameErrorText.value = ''

    if (!inputData.value.name) {
        nameErrorText.value = 'お名前は必須項目です'
        return
    }
}

const emailErrorText = ref('')
const validateEmail = () => {
    emailErrorText.value = ''

    if (!inputData.value.email) {
        emailErrorText.value = 'メールアドレスは必須項目です'
        return
    }

    // メールアドレスの正規表現
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(inputData.value.email)) {
        emailErrorText.value = 'メールアドレスの形式が正しくありません'
        return
    }
}

const clearError = (item: string) => {
    if (item === 'name') {
        nameErrorText.value = ''
    }

    if (item === 'email') {
        emailErrorText.value = ''
    }
}

const isConfirmDisabled = computed(() => {
    return Boolean(
        nameErrorText.value ||
            !inputData.value.name ||
            emailErrorText.value ||
            !inputData.value.email ||
            inputData.value.question.length > MAX_QUESTION_LENGTH,
    )
})

const isOpenConfirm = ref(false)
const openConfirm = () => {
    if (isConfirmDisabled.value) {
        return false
    }
    closeOrder()
    isOpenConfirm.value = true
}
const closeConfirm = () => {
    isOpenConfirm.value = false
}

const isOpenSendError = ref(false)
const openSendError = () => {
    isOpenSendError.value = true
}
const closeSendError = () => {
    isOpenSendError.value = false
    location.reload()
}

/**注文処理 */
const sendOrder = async () => {
    try {
        closeConfirm()

        const orderNo = format(new Date(), 'yyyyMMddHHmm')

        let orderItemsText = ''
        cartStore.items.forEach((item) => {
            orderItemsText += item.name + '\n'
        })

        const toOrnerSubject = `注文番号：${orderNo}`
        const toOrnerHeaders = `From: ${inputData.value.email}`
        const toOrnerBody = `サイトから注文が来ました。

─ご注文内容の確認─────────────────
受付番号：${orderNo}

ご注文商品：
${orderItemsText}

[ お名前 ] ${inputData.value.name}
[ メールアドレス ] ${inputData.value.email}
[ ご質問等 ] 
${inputData.value.question}

──────────────────────────`

        const toCustomerSubject = `[${orderNo}]ご注文ありがとうございます`
        const toCustomerHeaders = `From: ${inputData.value.email}`
        const toCustomerBody = `${inputData.value.name} 様
──────────────────────────

ご注文を承りました。
後程ご連絡させていただきますので今しばらくお待ちください。

─ご注文内容の確認─────────────────
受付番号：${orderNo}

ご注文商品：
${orderItemsText}

[ お名前 ] ${inputData.value.name}
[ メールアドレス ] ${inputData.value.email}
[ ご質問等 ] 
${inputData.value.question}

──────────────────────────`

        const postData = {
            orderItems: cartStore.items,
            orderNo: orderNo,
            email: inputData.value.email,
            name: inputData.value.name,
            question: inputData.value.question,
            toOrner: {
                subject: toOrnerSubject,
                headers: toOrnerHeaders,
                body: toOrnerBody,
            },
            toCustomer: {
                subject: toCustomerSubject,
                headers: toCustomerHeaders,
                body: toCustomerBody,
            },
            csrf_token: csrfStore.csrfToken,
            enviroment: ENVIROMENT_NAME,
        }
        console.log('postData:', postData)

        //注文送信API叩く
        const response = await axios.post(
            `${API_BASE_URL}/send.php`,
            postData,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
            },
        )
        console.log('response:', response)

        // サーバーからのレスポンスに応じて処理を分岐
        if (response.status === 200 && response.data.result) {
            //注文が成功した場合
            //TODO:cart内のデータを全て消す処理
            location.href = '/cart/complete'
        } else {
            // 通信エラーや予期しないエラーが発生した場合
            openSendError()
        }
    } catch (error) {
        console.error('注文処理中にエラーが発生しました:', error)
        openSendError()
    }
}
</script>

<template>
    <section class="Page">
        <Breadcrumbs
            v-if="breadcrumbsItems && breadcrumbsItems.length"
            :items="breadcrumbsItems"
        />
        <h1>カート</h1>
        <div class="Page__wrap">
            <div class="Page__itemsWrap">
                <CartItems :items="cartStore.items" />
            </div>
            <div v-if="cartStore.items.length" class="Page__order">
                <button class="Page__orderButton" @click="openOrder()">
                    この内容で注文する
                </button>
            </div>
        </div>

        <Modal :isShow="isOpenOrder" title="注文" size="l" @close="closeOrder">
            <template #body>
                <p>必要な情報をご入力ください。</p>
                <table class="table">
                    <colgroup>
                        <col width="30%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>
                                <label for="name"
                                    >お名前<span class="hissu"
                                        >必須</span
                                    ></label
                                >
                            </th>
                            <td>
                                <input
                                    id="name"
                                    :class="{ error: nameErrorText }"
                                    type="text"
                                    v-model="inputData.name"
                                    @focus="clearError('name')"
                                    @blur="validateName()"
                                />
                                <p v-if="nameErrorText" class="Page__errorText">
                                    {{ nameErrorText }}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label for="email"
                                    >メールアドレス<span class="hissu"
                                        >必須</span
                                    ></label
                                >
                            </th>
                            <td>
                                <input
                                    id="email"
                                    :class="{ error: emailErrorText }"
                                    type="email"
                                    v-model="inputData.email"
                                    @focus="clearError('email')"
                                    @blur="validateEmail()"
                                />
                                <p
                                    v-if="emailErrorText"
                                    class="Page__errorText"
                                >
                                    {{ emailErrorText }}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label for="qustion">ご質問等</label
                                ><small
                                    >※{{ MAX_QUESTION_LENGTH }}文字以内</small
                                >
                            </th>
                            <td>
                                <textarea
                                    id="qustion"
                                    class="Page__qustion"
                                    :class="{
                                        error:
                                            inputData.question.length >
                                            MAX_QUESTION_LENGTH,
                                    }"
                                    v-model="inputData.question"
                                ></textarea>
                                <p
                                    v-if="
                                        inputData.question.length >
                                        MAX_QUESTION_LENGTH
                                    "
                                    class="Page__errorText"
                                >
                                    {{ MAX_QUESTION_LENGTH }}文字を超えています
                                </p>
                                <small class=""
                                    >{{ inputData.question.length }}/{{
                                        MAX_QUESTION_LENGTH
                                    }}文字</small
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <template #footer>
                <div class="Page__modalButtons">
                    <Button
                        class="Page__modalButton"
                        text="キャンセル"
                        color="gray"
                        @click="closeOrder()"
                    />
                    <Button
                        class="Page__modalButton"
                        text="確認"
                        color="blue"
                        :isDisabled="isConfirmDisabled"
                        @click="openConfirm()"
                    />
                </div>
            </template>
        </Modal>

        <Modal
            :isShow="isOpenConfirm"
            title="注文確認"
            size="l"
            @close="closeConfirm"
        >
            <template #body>
                <p>よろしければ注文してください。</p>
                <table class="table">
                    <colgroup>
                        <col width="30%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>お名前</th>
                            <td>{{ inputData.name }}</td>
                        </tr>
                        <tr>
                            <th>メールアドレス</th>
                            <td>{{ inputData.email }}</td>
                        </tr>
                        <tr>
                            <th>ご質問等</th>
                            <td>
                                <pre>{{ inputData.question }}</pre>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <CartItems :items="cartStore.items" isNotDeleteButton />
            </template>
            <template #footer>
                <div class="Page__modalButtons">
                    <Button
                        class="Page__modalButton"
                        text="キャンセル"
                        color="gray"
                        @click="closeConfirm()"
                    />
                    <Button
                        class="Page__modalButton"
                        text="注文する"
                        color="blue"
                        @click="sendOrder()"
                    />
                </div>
            </template>
        </Modal>

        <Modal
            :isShow="isOpenSendError"
            title="注文エラー"
            size="l"
            @close="closeSendError"
        >
            <template #body>
                <p>
                    何らかの理由で注文ができませんでした。<br />恐れ入りますが少し時間をおいてから再度お試しください。
                </p>
            </template>
        </Modal>
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;

    &__wrap {
        position: relative;
        display: flex;
        column-gap: 40px;
    }

    &__itemsWrap {
        width: 100%;
    }

    &__order {
        position: sticky;
        top: 0;
        right: 0;
        width: 400px;
        text-align: center;
        padding-top: 24px;
    }

    &__orderButton {
        position: sticky;
        top: 0;
        right: 0;
        border: 1px solid #fb9a13;
        width: 100%;
        border-radius: 10px;
        background-color: #fbcf28;
        box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.1);
        font-size: 18px;
        padding: 12px 0;

        &:hover {
            background-color: #ffd439;
        }
    }

    &__qustion {
        height: 150px;
    }

    &__errorText {
        font-size: 14px;
        margin: 2px 0;
        color: #ec2222;
    }

    &__modalButtons {
        display: flex;
        column-gap: 12px;
    }

    & &__modalButton {
        width: 120px;
    }

    @media (max-width: 900px) {
        &__wrap {
            flex-direction: column-reverse;
            row-gap: 24px;
        }

        &__itemsWrap {
            padding: 0 10px;
        }

        &__order {
            width: 100%;
            padding: 0;
        }
    }
}
</style>
