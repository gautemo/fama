<template>
    <button @click="$emit('clicked')" :class="{ corner: corner }">
        <svg xmlns="http://www.w3.org/2000/svg" :style="{ height: `${size}px`, width: `${size}px` }" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path class="colored" d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    </button>
</template>

<script>
export default {
    props: ['size', 'corner']
}
</script>

<style scoped>
button{
    background: none;
    border: none;
    cursor: pointer;
}

.corner{
    position: fixed;
    z-index: 5;
    bottom: 20px;
    right: 20px;
}

.colored{
    fill: var(--main-color-green);
}
</style>