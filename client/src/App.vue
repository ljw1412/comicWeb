<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(0, 0, 0, 0);
}

/*滚动条里面轨道*/
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  border: 2px solid transparent;
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
