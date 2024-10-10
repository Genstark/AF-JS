<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <ul>
        <journal-card v-for="item in journal" :key="item.id" :entry=item></journal-card>
    </ul>
</template>

<script lang="js">
import _store from '../data/store.js';
export default {
    'data': _store
};
</script>