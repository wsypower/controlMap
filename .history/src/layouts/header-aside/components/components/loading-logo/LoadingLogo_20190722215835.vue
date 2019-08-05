<template>
    <div class="logo">
        <header>
  <div aria-busy="true" aria-label="Loading, please wait." role="progressbar"></div>
</header>
<main role="main">
  <img src="https://www.google.com/inbox/assets/images/intro/intro-logo.png" width="100" alt="" />
  <h1>Material Design Preloader</h1>
  <p>A CSS only solution that recreates the Material Design preloader; or, who needs jQuery anyway?</p>
  <p>You should set <code>aria-busy</code> to <code>false</code> when your stuff is loaded.
</main>
    </div>
</template>

<script>
    export default {
        name:'logo'
    }
</script>

<style lang="scss" scoped>
.logo{
    width: 300px;
    height: 300px;
    background-color: red;
}
</style>