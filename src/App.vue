<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
document.addEventListener('DOMContentLoaded',function(){
  let html = document.querySelector('html')
  let fontSize = window.innerWidth / 23
  fontSize = fontSize > 50 ? '50px' : fontSize + 'px'
  html.style.fontSize = fontSize
})
export default {
  
}
</script>

<style lang="scss">
</style>
