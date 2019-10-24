<template>
    <p class="line" @click="click">
        <svg xmlns="http://www.w3.org/2000/svg" :style="{ height: `${size}px`, width: `${size}px` }" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path class="icon" d="M15.32 3H8.68c-.26 0-.52.11-.7.29L3.29 7.98c-.18.18-.29.44-.29.7v6.63c0 .27.11.52.29.71l4.68 4.68c.19.19.45.3.71.3h6.63c.27 0 .52-.11.71-.29l4.68-4.68c.19-.19.29-.44.29-.71V8.68c0-.27-.11-.52-.29-.71l-4.68-4.68c-.18-.18-.44-.29-.7-.29zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm0-4.3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z"/></svg>
        <span>Report post</span>
    </p>
</template>

<script>
import { logEvent } from '@/firebaseinit'

export default {
    props: ['size'],
    data(){
        return{
            reported: false
        }
    },
    methods: {
        click(){
            if(!this.reported){
                logEvent('click_report');
                const result = window.confirm(`Are you sure you want to report this? If it get's enough reports it will be removed`);
                if(result){
                    logEvent('add_report');
                    this.reported = true;
                    this.$emit('clicked');
                }else{
                    logEvent('regret_report');
                }
            }
        }
    }
}
</script>

<style scoped>
.line{
    margin: 20px 0 5px 0;
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
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