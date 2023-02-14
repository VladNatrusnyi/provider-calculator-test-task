import { createSlice } from '@reduxjs/toolkit'
import {prices} from "../helpers/constants";

const initialState = {
  storage: 0,
  transfer: 0,

  result: {
    backblaze: 0,
    bunny: 0,
    scaleway: 0,
    vultr: 0
  },
  bunnyType: 'HDD',
  scalewayType: 'Single',
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setSliderValue: (state, action) => {
      switch (action.payload.type) {
        case 'storage':
          state.storage = action.payload.value
          break;
        case 'transfer':
          state.transfer = action.payload.value
          break;
        default:
          return
      }
    },

    calculatePrice (state, action) {
      //blackblaze
      const backblazePrice = state.storage * prices.blackblaze.storage + state.transfer * prices.blackblaze.transfer
      state.result.backblaze = backblazePrice > 7 ? backblazePrice : 7

      //bunny
      const bunnyStoragePrice = state.bunnyType === 'HDD' ? prices.bunny.storage.HDD : prices.bunny.storage.SDD
      const bunnyPrice = state.storage * bunnyStoragePrice + state.transfer * prices.bunny.transfer
      state.result.bunny = bunnyPrice <= 10 ? bunnyPrice : 10

      //scaleway
      const scalewayStoragePrice = state.storage <= 75 ? 0
        : state.scalewayType === 'Multi' ? (state.storage - 75) * prices.scaleway.storage.multi : (state.storage - 75) * prices.scaleway.storage.single
      const scalewayTransferPrice = state.transfer <= 75 ? 0 : (state.transfer - 75) * prices.scaleway.transfer
      state.result.scaleway = scalewayStoragePrice + scalewayTransferPrice

      //vultr
      const vultrPrice = state.storage * prices.vultr.storage + state.transfer * prices.vultr.transfer
      state.result.vultr = vultrPrice <= 5 ? 5 : vultrPrice

    },

    setBunnyType (state, action) {
      state.bunnyType = action.payload
    },

    setScalewayType (state, action) {
      state.scalewayType = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setSliderValue,
  calculatePrice,
  setBunnyType,
  setScalewayType
} = calculatorSlice.actions

export default calculatorSlice.reducer