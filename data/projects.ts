import projectFiles from './projects/*.json';
import { Property } from '../types';

export const projects: Property[] = projectFiles.map((proj: any) => ({
  id: proj.id,
  name: proj.name,
  price: proj.price,
  deposit: proj.deposit,
  location: proj.location,
  description: proj.description,
  image: proj.image
}));
