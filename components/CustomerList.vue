<template>
    <div>
        <h2>Customer List</h2>
    </div>
</template>

<script>
export default {
    name: "CustomerList",
    data() {
        return {
            customerList: [],
            count: 0
        }
    },
    mounted() {
        console.log(this);
    }
} 
</script>