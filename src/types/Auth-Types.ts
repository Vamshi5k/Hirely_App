// src/types/Auth-Types.ts
export type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  showOnboarding: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};
