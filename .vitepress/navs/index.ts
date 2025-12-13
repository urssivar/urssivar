import { languageNav } from "./language";
import { notesNav } from "./notes";
import { genealogyNav } from "./genealogy";

export const navModules = [
  languageNav,
  notesNav,
  genealogyNav
];

export type {
  NavNode,
  Article,
  Section,
  Module,
  NavTree
} from "./types";
