/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue/types/vue' {
    interface Vue {
        $filters: IKeyValue
    }
}

declare module 'js-md5'
