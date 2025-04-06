import { create } from 'zustand';

type OrderState = {
  currentRank: string;
  desiredRank: string;
  selectedChampions: string[];
  region: string;
  boostMode: string;
  addons: string[];
  setCurrentRank: (rank: string) => void;
  setDesiredRank: (rank: string) => void;
  setSelectedChampions: (champions: string[]) => void;
  addChampion: (champion: string) => void;
  removeChampion: (champion: string) => void;
  setRegion: (region: string) => void;
  setBoostMode: (mode: string) => void;
  setAddons: (addons: string[]) => void;
  resetOrder: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  currentRank: '',
  desiredRank: '',
  selectedChampions: [],
  region: '',
  boostMode: 'self-piloted',
  addons: [],
  
  setCurrentRank: (rank) => set({ currentRank: rank }),
  setDesiredRank: (rank) => set({ desiredRank: rank }),
  setSelectedChampions: (champions) => set({ selectedChampions: champions }),
  
  addChampion: (champion) => set((state) => {
    if (state.selectedChampions.includes(champion)) {
      return state;
    }
    if (state.selectedChampions.length >= 5) {
      return state;
    }
    return { selectedChampions: [...state.selectedChampions, champion] };
  }),
  
  removeChampion: (champion) => set((state) => ({
    selectedChampions: state.selectedChampions.filter(c => c !== champion)
  })),
  
  setRegion: (region) => set({ region }),
  setBoostMode: (mode) => set({ boostMode: mode }),
  setAddons: (addons) => set({ addons }),
  
  resetOrder: () => set({
    currentRank: '',
    desiredRank: '',
    selectedChampions: [],
    region: '',
    boostMode: 'self-piloted',
    addons: []
  })
})) 