<template>
  <section>
    Home
    <AddButton size="50" :corner="true" v-on:clicked="$router.push('add-post')"/>
  </section>
</template>

<script>
export default {
    components: {
        AddButton: () => import('@/components/AddButton')
    }
}
</script>

<style scoped>
section{
  flex: 1;
}
</style>
