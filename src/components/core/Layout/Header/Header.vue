<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import CountryDropdown from './components/CountryDropdown.vue'
// import { useMatchMedia } from '@/core/composable/useMediaMatch'

export default defineComponent({
  name: 'Header',
  components: { CountryDropdown },
  setup () {
    // const { isDesktop, isTablet, isMobile } = useMatchMedia()

    const open = ref(false)
    const setOpen = (newOpen: boolean) => {
      open.value = newOpen
    }

    return {
      // isDesktop: computed(() => isDesktop.value),
      // isTablet: computed(() => isTablet.value),
      // isMobile: computed(() => isMobile.value),
      open,
      setOpen,
    }
  },
})
</script>

<style lang="scss" scopped src="./Header.scss"></style>
<template>
  <section id="header">
    <img
      id="menu-logo"
      src="@/assets/logo.png"
    >
    <!-- <MobileHeaderDropdowns v-if="isMobile" /> -->
    <div
      id="header_dropdowns"
    >
      <CountryDropdown />
    </div>
    <div
      id="header_logout"
      style="width: 35px; height: 35px;"
    >
      <button>
        <!-- <span v-if="isDesktop">Logout</span> -->
        <svg
          tabindex="0"
          width="30"
          height="32"
          viewBox="0 0 30 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 20V16H14V12H24V8L30 14L24 20ZM22 18V26H12V32L0 26V0H22V10H20V2H4L12 6V24H20V18H22Z"
            fill="black"
            fill-opacity="0.66"
          />
        </svg>
      </button>
    </div>
  </section>
</template>
