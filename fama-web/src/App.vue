<template>
  <main>
    <nav>
      <router-link to="/">SOCIAL FEED</router-link>
      <router-link to="/profile">PROFILE</router-link>
    </nav>
    <router-view/>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

:root{
  --main-color-green: #0f7173ff;
  --main-color-red: #f15156ff;
  --main-color-orange: #f77f00ff;
  --main-color-blue: #55DDE0;
  --faded-color-red: rgba(241, 81, 86, 0.65);
  --faded-color-orange: rgba(247, 128, 0, 0.65);
  --faded-color-blue: rgba(85, 222, 224, 0.65);
}

body{
  margin: 0;
  font-family: 'Roboto Slab', serif;
}

main{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

nav{
  display: flex;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
              0 2px 2px rgba(0,0,0,0.12), 
              0 4px 4px rgba(0,0,0,0.12);
  z-index: 2;
}

nav a{
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.router-link-exact-active{
  border-bottom: 3px solid var(--main-color-green);
  color: var(--main-color-green);
}

ul{
    list-style: none;
    margin: 0;
    padding: 0;
}

.hide{
    visibility: hidden;
}
</style>
