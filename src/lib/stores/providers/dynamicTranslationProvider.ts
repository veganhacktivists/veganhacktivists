// 'use client'

// import { type ReactNode, createContext, useRef, useContext } from 'react'
// import { type StoreApi, useStore } from 'zustand'

// import {
//   type DynamicTranslationStore ,
//   createDynamicTranslationStore,
// } from '../dynamicTranslationStore'
// import { useRouter } from 'next/navigation'

// export const DynamicTranslationStoreContext = createContext<StoreApi<DynamicTranslationStore> | null>(
//   null,
// )

// export interface DynamicTranslationStoreProviderProps {
//   children: ReactNode
// }

// export const DynamicTranslationStoreProvider = ({
//   children,
// }: DynamicTranslationStoreProviderProps) => {
//     const {  } = useRouter();
//   const currentLocale = useRouterLocale();
//   const storeRef = useRef<StoreApi<DynamicTranslationStore>>()
//   if (!storeRef.current) {
//     storeRef.current = createDynamicTranslationStore( {showLocalizedContent:currentLocale !== defaultLocale})
//   }

//   return (
//     <DynamicTranslationStoreContext.Provider value={storeRef.current}>
//       {children}
//     </DynamicTranslationStoreContext.Provider>
//   )
// }

// export const useCounterStore = <T,>(
//   selector: (store: DynamicTranslationStore) => T,
// ): T => {
//   const counterStoreContext = useContext(DynamicTranslationStoreContext)

//   if (!counterStoreContext) {
//     throw new Error(`useCounterStore must be use within DynamicTranslationStoreProvider`)
//   }

//   return useStore(counterStoreContext, selector)
// }
