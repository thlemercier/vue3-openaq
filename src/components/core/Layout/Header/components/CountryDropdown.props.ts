import { Country } from '@/core/typings'
import { ComputedRef, WritableComputedRef } from 'vue'

export interface TemplateProps {
  getCountryName: (country: Country | undefined) => string | undefined
  countries: ComputedRef<Country[]>
  country: WritableComputedRef<Country | undefined>
  setCountry: (value: string) => void
  getOr: <T>(val: T, defaultVal: T) => T
  hasValue: <T>(val: T) => boolean
}
