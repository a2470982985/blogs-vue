<template>
  <div>
    loading....
  </div>
</template>

<script>
export default ({
  name: 'health',
  methods: {
    redirectURL() {
      window.location.href = "/api/health"
    }
  },
  created(){
    this.redirectURL();
  }
})
</script>

<style scoped>

</style>