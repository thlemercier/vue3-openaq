/**
 * The only way to actually change state in a Vuex store is by committing a mutation.
 */
import { MutationTree } from 'vuex'
import { AppModuleMutations, AppModuleMutationTypes, AppModuleState } from '../../typings/app.module.interface'

const mutations: MutationTree<AppModuleState> & AppModuleMutations = {
  [AppModuleMutationTypes.SET_COUNTRIES] (state, payload) {
    state.countries = payload?.countries || []
  },
  [AppModuleMutationTypes.SET_COUNTRY] (state, payload) {
    state.country = payload?.country || undefined
  },
}

export default mutations
