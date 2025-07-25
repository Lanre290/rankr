export interface afterVerificationMiddlerwareInterface {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}