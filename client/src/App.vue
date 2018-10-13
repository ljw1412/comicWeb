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
}

::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
  border-radius: 100px;
}

::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 100px;
  border-radius: 100px;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 2px solid transparent;
  min-height: 10px;
}

::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0, 0, 0, 0.61);
  -webkit-border-radius: 100px;
  border-radius: 100px;
}
</style>
