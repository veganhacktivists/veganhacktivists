import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { DeepPartial } from 'react-hook-form';
import type { Dispatch } from 'react';
import type { SetStateAction } from 'react';
import type { z } from 'zod';
import type { submitRequestSchemaClient } from 'lib/services/playground/schemas';

type FormProps = DeepPartial<z.input<typeof submitRequestSchemaClient>>;

interface PlaygroundSubmitRequestProps {
  form: FormProps;
}

interface PlaygroundSubmitRequestMethods {
  setForm: Dispatch<SetStateAction<FormProps>>;
  resetForm: () => void;
}

const usePlaygroundSubmitRequestStore = create<
  PlaygroundSubmitRequestProps & PlaygroundSubmitRequestMethods
>()(
  persist(
    (set) => ({
      form: {},

      setForm: (prevState) => {
        if (prevState instanceof Function) {
          set((state) => ({
            ...state,
            form: {
              ...state?.form,
              ...prevState(state?.form),
            },
          }));
          return;
        }
        set((state) => ({
          ...state,
          form: { ...state.form, ...prevState },
        }));
      },
      resetForm: () => {
        set((state) => ({
          ...state,
          form: {},
        }));
      },
    }),
    {
      name: 'playground-submit-request', // name of item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    },
  ),
);

export default usePlaygroundSubmitRequestStore;
