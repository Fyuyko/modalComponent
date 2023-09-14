<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <div>{{modal}}</div>
  </div>
</template>

<script setup lang="ts">
  const modal = useModal();
</script>
