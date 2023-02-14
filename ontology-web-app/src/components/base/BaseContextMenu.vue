<template>
    <div class="context-menu" v-show="isShow" 
        :style="{left: contextMenuX + 'px', top: contextMenuY + 'px'}" 
    >
        <div 
            @click="clickAction(item.action(item.payload))" 
            class="context-menu__item"
            v-for="item in contextMenuItems" 
            :key="item.title" 
        > 
            {{item.title}} 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BaseContextMenu',
        props: {
            contextMenuItems: {},
            contextMenuX: {},
            contextMenuY: {},
        },
        data() {
            return {
                isShow: false,
            }
        },
        created() {
            this.$eventBus.on('showContext', () => { this.isShow = true })
            this.$eventBus.on('hideContext', () => { this.isShow = false })
            this.$eventBus.on('setContext', (isShow) => { this.isShow = isShow })
        },
        mounted () {
            document.addEventListener('click', this.clickOutside)
        },
        methods: {
            /**
             * Method click ra ngoài component
             * @author: NMTuan (12/08/2021)
             */
            clickOutside (e) {
                if (!this.$el.contains(e.target)) {
                    this.isShow = false
                }
            },
            /**
             * Method click thực hiện item action
             * @author: NMTuan (12/08/2021)
             */
            clickAction(callback = function(){}) {
                callback()
                this.isShow = false
            }
        }
    }
</script>

<style scoped>
.context-menu {
    position: absolute; 
    z-index: 9999;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #888888;
}
.context-menu .context-menu__item {
    height: 40px;
    width: 100px;
    background-color: #fff;
    line-height: 40px;
    padding: 0 10px;
    cursor: pointer;
}
.context-menu .context-menu__item:hover {
    background-color: #1196dd;
    color: #fff;
}
</style>