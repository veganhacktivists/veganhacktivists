import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { z } from 'zod';
import type { applyToRequestSchemaClient } from 'lib/services/playground/schemas';
import type { PlaygroundRequest } from '@prisma/client';

type FormProps = z.infer<typeof applyToRequestSchemaClient>;
interface PlaygroundApplyProps {
  forms: Record<PlaygroundRequest['id'], FormProps>;
}

interface PlaygroundApplyMethods {
  getForm: (id: PlaygroundRequest['id']) => FormProps;
  setForm: (id: PlaygroundRequest['id']) => (form: Partial<FormProps>) => void;
  resetForm: (id: PlaygroundRequest['id']) => () => void;
  resetForms: () => void;
}

const usePlaygroundApplyStore = create<
  PlaygroundApplyProps & PlaygroundApplyMethods
>()(
  persist(
    (set, get) => ({
      forms: {},
      getForm: (id) => {
        return get().forms[id] || {};
      },
      setForm: (id) => (form) => {
        set((state) => ({
          ...state,
          forms: {
            ...state.forms,
            [id]: { ...state.forms[id], ...form },
          },
        }));
      },
      resetForm: (id) => () => {
        set((state) => {
          delete state.forms[id];
          return state;
          // const { [id]: _form, ...rest } = state.forms;
          // return { ...state, form: rest };
        });
      },
      resetForms: () => {
        set((state) => ({ ...state, forms: {} }));
      },
    }),
    {
      name: 'playground-application', // name of item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    },
  ),
);

export default usePlaygroundApplyStore;
