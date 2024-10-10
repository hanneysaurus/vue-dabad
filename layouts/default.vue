<template>
  <div>
    <header>
      <nav>
        <h1>Hanneysaurus</h1>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/database">Database</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <div>
      <slot />
    </div>

  </div>
</template>


<style scoped>

</style>
