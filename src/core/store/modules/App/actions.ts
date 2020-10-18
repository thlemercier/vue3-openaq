/**
 * Actions are similar to mutations, the differences being that:
 * Instead of mutating the state, actions commit mutations.
 * Actions can contain arbitrary asynchronous operations.
 */
import { http } from '@/core/services/fetch'
import { Country } from '@/core/typings'
import { ActionTree } from 'vuex'

import { AppStore } from '../..'
import { AppModuleActions, AppModuleActionTypes, AppModuleMutationTypes, AppModuleState } from '../../typings/app.module.interface'

const actions: ActionTree<AppModuleState, AppStore> & AppModuleActions = {
  [AppModuleActionTypes.FETCH_MANDATORY_DATA]: ({ commit }) =>
    new Promise((resolve, reject) => {
      const requests: [Promise<Country[]>] = [
        http.get<Country[]>('/countries', { limit: ['195'] }),
      ]

      Promise.all(requests)
        .then(([countries]) => {
          commit(AppModuleMutationTypes.SET_COUNTRIES, { countries })
          commit(AppModuleMutationTypes.SET_COUNTRY, { country: countries[15] })
          resolve()
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    }),
  [AppModuleActionTypes.SET_COUNTRY]: ({ commit }, payload) => commit(AppModuleMutationTypes.SET_COUNTRY, { country: payload }),

}

export default actions
