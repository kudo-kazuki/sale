<script setup lang="ts"></script>

<template>
    <div>
        <h1>管理ページ</h1>
        <p>ようこそ、管理者さん</p>
        <ul>
            <li><router-link to="/admin/order_index">注文一覧</router-link></li>
            <!-- 他の管理ページへのリンクもここに追加 -->
        </ul>
    </div>
</template>
