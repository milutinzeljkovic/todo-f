<template>
    <div>
        <h1>Header</h1>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Header',
    methods: {
        ...mapActions(['fetchCurrentUser', 'loginUser']),
    },
    computed: mapGetters(['getUser']),
    created() {
        this.fetchCurrentUser({});
    }
}
</script>

<style>

</style>