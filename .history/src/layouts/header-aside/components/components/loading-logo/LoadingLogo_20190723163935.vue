<template>
  <div class="logo">
    <!-- 头部彩色条 -->
    <header>
      <div aria-busy="true" aria-label="Loading, please wait." role="progressbar"></div>
    </header>
    <main role="main">
      <div class="loader" flex="main:center">
        <div class="loader_overlay" flex="main:center cross:center">
          <div class="loadering">
            <span class="ouro ouro2">
              <span class="left">
                <span class="anim"></span>
              </span>
              <span class="right">
                <span class="anim"></span>
              </span>
            </span>
          </div>
          <!-- <div class="loader_content" flex="main:center cross:center">
            <cg-icon-svg name="logo" class="logo__icon"></cg-icon-svg>
          </div> -->
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
    position: relative;
  }
  &_content {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 13px 5px rgba(234, 234, 234, 0.67);
    .logo__icon {
      font-size: 100px;
      color: rgb(231, 227, 227);
    }
  }
}
.loadering{
  width: 100%;
  height: 100%;
}
.ouro {
  position: relative;
  display: inline-block;
  height: 46px;
  width: 46px;
  margin: 1em;
  border-radius: 50%;
  background: none repeat scroll 0 0 #dddddd;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 0 25px rgba(0, 0, 255, 0.075);
}

.ouro:after {
  content: '';
  position: absolute;
  display: block;
  height: 28px;
  width: 28px;
  background: none repeat scroll 0 0 #f2f2f2;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.ouro > span {
  position: absolute;
  height: 100%;
  width: 50%;
  overflow: hidden;
}
.left {
  left: 0;
}
.right {
  left: 50%;
}

.anim {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 999px;
  background: none repeat scroll 0 0 #508ec3;
  opacity: 0.8;
  -webkit-animation: ui-spinner-rotate-left 3s infinite;
  animation: ui-spinner-rotate-left 3s infinite;
  -webkit-transform-origin: 0 50% 0;
  transform-origin: 0 50% 0;
}
.left .anim {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.right .anim {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  left: -100%;
  -webkit-transform-origin: 100% 50% 0;
  transform-origin: 100% 50% 0;
}

/* v2 */
.ouro2 .anim {
  -webkit-animation-delay: 0;
  animation-delay: 0;
}
.ouro2 .right .anim {
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}

/* v3 */
.ouro3 .anim {
  -webkit-animation-delay: 0s;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  animation-delay: 0s;
  animation-duration: 3s;
  animation-timing-function: linear;
}
.ouro3 .right .anim {
  -webkit-animation-name: ui-spinner-rotate-right;
  -webkit-animation-delay: 0;
  -webkit-animation-delay: 1.5s;
  animation-name: ui-spinner-rotate-right;
  animation-delay: 0;
  animation-delay: 1.5s;
}

/* round variation */
.round .ouro:after {
  display: none;
}

/* double variation */
.double .ouro:after {
  height: 13px;
  width: 13px;
  left: 7px;
  top: 7px;
  border: 10px solid #ddd;
  background: transparent;
  box-shadow: none;
}

@keyframes ui-spinner-rotate-right {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes ui-spinner-rotate-left {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes ui-spinner-rotate-right {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(180deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes ui-spinner-rotate-left {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

/*
 * Some bugs with Chrome (Android), Safari and Opera, I'll try to see how http://atomeye.com/projects/sass-css-spinner.html made his code.
 */

/* presentation styles */
html {
  height: 100%;
}
body {
  text-align: center;
  background: radial-gradient(circle, #fff 0%, #bbb 85%) no-repeat;
  background: -webkit-radial-gradient(circle, #fff 0%, #bbb 85%) no-repeat;
  height: 100%;
  display: table;
  width: 100%;
}
.block {
  display: table-cell;
  vertical-align: middle;
}
h1,
a {
  margin-top: 1em;
  font-family: 'Open Sans Light', 'Open Sans', 'Segoe UI', Helvetica, Arial;
  color: #888;
  font-weight: lighter;
}
.info {
  margin-top: 25px;
}
.info a {
  font-size: 12px;
  color: #999;
}
.info br + a {
  text-decoration: none;
}
</style>