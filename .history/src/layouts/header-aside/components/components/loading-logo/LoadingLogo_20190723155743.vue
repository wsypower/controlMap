<template>
  <div class="logo">
    <!-- 头部彩色条 -->
    <header>
      <div aria-busy="true" aria-label="Loading, please wait." role="progressbar"></div>
    </header>
    <main role="main">
      <div class="loader" flex="main:center">
        <div class="loader_overlay"></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'logo'
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @function colour($value) {
    @return map-get($colours, $value);
  }
  // 发光条高度变量
  $preloader-height: 12px;
  $colours: (
    green: #5fa783,
    red: #cf7063,
    blue: #638ddb,
    yellow: #ebc471
  );
  // 发光条速度变量
  $animation-duration: 4.5s;
  // 发光条
  header [role='progressbar'][aria-busy='true'] {
    position: absolute;
    top: 0;
    left: 0;
    padding-top: $preloader-height;
    width: 100%;
    background-color: colour(green);
    animation: preloader-background linear $animation-duration infinite;

    &::before,
    &::after {
      display: block;
      position: absolute;
      top: 0;
      z-index: 2;
      width: 0;
      height: $preloader-height;
      background: #afa;
      animation: preloader-front linear $animation-duration infinite;
      content: '';
    }

    &::before {
      right: 50%;
    }

    &::after {
      left: 50%;
    }
  }

 
  header {
    position: relative;
    width: 100%;
    height: 60px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex: 1 1 auto;
    text-align: center;
    // background-color: red;

    :root & > * + * {
      margin-top: 1em;
    }
  }
}

.loader {
  height: 100%;
  position: relative;
  margin: auto;
  width: 400px;
  padding-top: 180px;
  &_overlay {
    width: 240px;
    height: 240px;
    background: transparent;
    box-shadow: 0px 0px 0px 1000px rgba(255, 255, 255, 0.67), 0px 0px 19px 0px rgba(0, 0, 0, 0.16) inset;
    border-radius: 100%;
    z-index: -1;
  }

}

</style>