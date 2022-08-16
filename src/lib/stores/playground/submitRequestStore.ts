import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { inferMutationInput } from 'lib/client/trpc';

type FormProps = Partial<inferMutationInput<'playground.submitRequest'>>;

interface PlaygroundSubmitRequestProps {
  form: FormProps;
}

interface PlaygroundSubmitRequestMethods {
  getForm: () => FormProps;
  setForm: () => (form: Partial<FormProps>) => void;
  resetForm: () => () => void;
}

const usePlaygroundSubmitRequestStore = create<
  PlaygroundSubmitRequestProps & PlaygroundSubmitRequestMethods
>()(
  persist(
    (set, get) => ({
      form: {},

      getForm: () => {
        return get().form;
      },

      setForm: () => (form) => {
        set((state) => ({
          ...state,
          form: { ...state.form, ...form },
        }));
      },
      resetForm: () => () => {
        set((state) => {
          state.form = {};
          return state;
        });
      },
    }),
    {
      name: 'playground-submit-request', // name of item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export default usePlaygroundSubmitRequestStore;
