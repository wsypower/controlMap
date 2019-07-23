<template>
  <div class="logo">
    <!-- 头部彩色条 -->
    <header>
      <!-- <div aria-busy="true" aria-label="Loading, please wait." role="progressbar"></div> -->
    </header>
    <main role="main">
      <div class="loader" flex="cross:center dir:top">
        <div class="loader_overlay" flex="main:center cross:center">
          <div class="loadering" flex="main:center cross:center">
            <!-- 环绕圈 -->
            <div class="showbox">
              <div class="loader_scroll">
                <svg class="circular" viewBox="25 25 50 50">
                  <circle
                    class="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
            </div>
          </div>
          <!-- LOGO -->
          <div class="loader_content" flex="main:center cross:center">
            <cg-icon-svg name="logo" class="logo__icon"></cg-icon-svg>
          </div>
        </div>
        <div class="loader_title"></div>
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
    width: 180px;
    height: 180px;
    background: transparent;
    box-shadow: 0px 0px 0px 1000px rgba(255, 255, 255, 0.67), 0px 0px 19px 0px rgba(0, 0, 0, 0.16) inset;
    border-radius: 100%;
    z-index: -1;
    position: relative;
  }
  &_content {
    position: absolute;
    width: 140px;
    height: 140px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 13px 5px rgba(234, 234, 234, 0.67);
    .logo__icon {
      font-size: 70px;
      color: #5b8bda;
    }
  }

  &_title {
    width: 100%;
    height: 60px;
    background-color: red;
  }
}
.loadering {
  width: 100%;
  height: 100%;
}
// 渐变色
$green: #0057e7;
$blue: #0057e7;
$red: #0057e7;
$yellow: #0057e7;
$white: #eee;

// scaling... any units
$width: 180px;

.loader_scroll {
  position: relative;
  margin: 0 auto;
  width: $width;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  100%,
  0% {
    stroke: $red;
  }
  40% {
    stroke: $blue;
  }
  66% {
    stroke: $green;
  }
  80%,
  90% {
    stroke: $yellow;
  }
}
.showbox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>