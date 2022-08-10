import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { z } from 'zod';

import type { submitRequestSchemaClient } from 'lib/services/playground/schemas';

type FormProps = Partial<z.infer<typeof submitRequestSchemaClient>>;

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
