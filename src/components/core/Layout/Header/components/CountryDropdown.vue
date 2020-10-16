<script lang="ts">
import { ConfigDropdown, RadioButton } from '@/components/common'
import { AppStore } from '@/core/store'
import { Country } from '@/core/typings'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CountryDropdown',
  components: { ConfigDropdown, RadioButton },
  setup () {
    const appStore = useStore<AppStore>()
    const countries = computed<Country[]>(() => appStore.state.app.countries)
    // const market = computed<Market | null>(() => appStore.state.session.currentMarket)
    const isOpen = ref(false)
    const setIsOpen = () => {
      isOpen.value = !isOpen.value
    }

    const selectedCountry = ref('Australia')

    const setCountry = (event: { target: HTMLInputElement }) => console.log(event.target.value)

    return {
      countries,
      isOpen,
      setIsOpen,
      setCountry,
      selectedCountry,
    }
  },
})
</script>

<style lang="scss" scopped src="./SingleSelect.scss"></style>
<template>
  <ConfigDropdown aria-label="Language">
    <template #label>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM16 30C14.033 30 12.16 29.593 10.462 28.861L17.748 20.664C17.911 20.481 18.001 20.245 18.001 20V17C18.001 16.448 17.553 16 17.001 16C13.47 16 9.745 12.329 9.708 12.293C9.52 12.105 9.266 12 9.001 12H5.001C4.449 12 4.001 12.448 4.001 13V19C4.001 19.379 4.215 19.725 4.554 19.894L8.001 21.618V27.489C4.374 24.959 2.001 20.757 2.001 16C2.001 13.853 2.485 11.819 3.349 10H7.001C7.266 10 7.521 9.895 7.708 9.707L11.708 5.707C11.896 5.519 12.001 5.265 12.001 5V2.581C13.269 2.204 14.611 2 16.001 2C18.201 2 20.282 2.508 22.135 3.412C22.005 3.521 21.879 3.636 21.759 3.757C20.626 4.89 20.002 6.397 20.002 8C20.002 9.603 20.626 11.109 21.759 12.243C22.898 13.382 24.422 14.001 25.998 14.001C26.097 14.001 26.196 13.999 26.295 13.994C26.727 15.613 27.506 19.827 26.032 25.629C26.018 25.684 26.01 25.738 26.006 25.792C23.465 28.388 19.922 30 16.002 30H16Z"
        />
      </svg>
    </template>
    <template #value>
      {{ selectedCountry }}
    </template>
    <div class="single-select_container flexColumn p_5 p_b_0">
      <div class="single-select_search"></div>
      <ul class="single-select_options flexColumn">
        <li v-for="country in countries" :key="country.name" class="single-select_options_option">
          <RadioButton
            name="country.name"
            :id="country.name"
            :value="country.name"
            :label="country.name"
            v-model="selectedCountry"
          />
        </li>
      </ul>
      <div class="single-select_actions flexRow sticky-bottom">
        <button>Cancel</button>
        <button>Apply</button>
      </div>
    </div>
  </ConfigDropdown>
</template>
