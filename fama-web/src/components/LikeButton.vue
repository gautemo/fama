<template>
    <button @click.stop="click">
        <svg xmlns="http://www.w3.org/2000/svg" :style="{ height: `${size}px`, width: `${size}px` }" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path class="heart" :class="{ liked: liked }" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <span class="likes-count" :class="{ hide: likesComputed === 0 }">{{likes}}</span>
    </button>
</template>

<script>
export default {
    props: ['size', 'likes'],
    data(){
        return{
            liked: false
        }
    },
    methods: {
        click(){
            if(!this.liked){
                this.liked = true;
                this.$emit('clicked');
            }
        }
    },
}
</script>

<style scoped>
button{
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.heart.liked{
    fill: var(--main-color-red);
}

.heart:not(.liked){
    fill: transparent;
    stroke: white;
    stroke-width: 2px;
}

.likes-count{
  text-align: center;
  color: white;
  cursor: pointer;
  margin-top: 3px;
}
</style>