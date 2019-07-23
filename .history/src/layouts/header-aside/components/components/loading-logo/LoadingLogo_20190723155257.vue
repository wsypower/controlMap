<template>
  <div class="logo">
    <!-- 头部彩色条 -->
    <header>
      <div aria-busy="true" aria-label="Loading, please wait." role="progressbar"></div>
    </header>
    <main role="main">
      <div class="loader">
        <div class="loader_overlay"></div>
        <div class="loader_cogs">
          <!-- LOGO样式 -->
        </div>
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

  // Animations
  @keyframes preloader-background {
    0%,
    24.9% {
      background-color: colour(green);
    }

    25%,
    49.9% {
      background-color: colour(red);
    }

    50%,
    74.9% {
      background-color: colour(blue);
    }

    75%,
    100% {
      background-color: colour(yellow);
    }
  }

  @keyframes preloader-front {
    0% {
      width: 0;
      background-color: colour(red);
    }

    24.9% {
      width: 50%;
      background-color: colour(red);
    }

    25% {
      width: 0;
      background-color: colour(blue);
    }

    49.9% {
      width: 50%;
      background-color: colour(blue);
    }

    50% {
      width: 0;
      background-color: colour(yellow);
    }

    74.9% {
      width: 50%;
      background-color: colour(yellow);
    }

    75% {
      width: 0%;
      background-color: colour(green);
    }

    100% {
      width: 50%;
      background-color: colour(green);
    }
  }

  // Unimportant bits
  * {
    box-sizing: border-box;
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


/* Mixins */

@mixin center {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

@mixin hole {
  border-radius: 100%;
  background: white;
  position: absolute;
}

.loader {
  height: 100%;
  position: relative;
  margin: auto;
  width: 400px;
  &_overlay {
    width: 200px;
    height: 200px;
    background: transparent;
    box-shadow: 0px 0px 0px 1000px rgba(255, 255, 255, 0.67), 0px 0px 19px 0px rgba(0, 0, 0, 0.16) inset;
    border-radius: 100%;
    z-index: -1;
    @include center;
  }
  &_cogs {
    z-index: -2;
    width: 100px;
    height: 100px;
    top: -120px !important;
    @include center;
  
  }
}
</style>