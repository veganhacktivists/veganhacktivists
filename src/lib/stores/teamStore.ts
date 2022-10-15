import create from 'zustand';

import type { ITeam } from '../../types/generated/contentful';

export interface TeamStoreProps {
  teamOrder: ITeam[];
}

export interface TeamStoreMethods {
  setTeamOrder: (teams: ITeam[]) => void;
}

export const useTeamStore = create<TeamStoreProps & TeamStoreMethods>(
  (set) => ({
    teamOrder: [],
    setTeamOrder: (teams) => {
      set({ teamOrder: teams });
    },
  })
);
