import type { Property } from '../types';

// Import all project JSON files at build time
const modules = import.meta.glob('./projects/*.json', {
  eager: true,
});

const projects: Property[] = Object.values(modules).map(
  (mod: any) => mod.default
);

export default projects;

