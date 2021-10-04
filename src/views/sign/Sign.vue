<template>
  <div>
    loading....
  </div>
</template>

<script>
export default ({
  name: 'sign',
  methods: {
    redirectURL() {
      window.location.href = "/api/sign"
    }
  },
  created(){
    this.redirectURL();
  }
})
</script>

<style scoped>

</style>