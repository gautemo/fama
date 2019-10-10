<template>
    <p v-if="count > 0" class="comment-counter">
        <svg xmlns="http://www.w3.org/2000/svg" :style="{ height: `${size}px`, width: `${size}px` }" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path class="icon" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H6l-2 2V5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/></svg>
        <span>{{count}}</span>
    </p>
</template>

<script>
export default {
    props: ['size', 'count']
}
</script>

<style scoped>
.comment-counter{
    margin: 0;
    display: flex;
    align-items: center;
    color: white;
}

svg{
    margin-right: 3px;
}

span{
    margin-bottom: 3px;
}

.icon{
    fill: white;
}
</style>