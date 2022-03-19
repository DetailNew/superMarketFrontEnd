<template>
  <div class="user-item">
      <div class="number">
          <slot name="value"></slot>
          <slot name="unit"></slot>
      </div>
      <div class="text">
          <slot name="desc"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'UserInfoItem',
}
</script>

<style scoped>
.user-item{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size);
}
</style>