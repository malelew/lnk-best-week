import { getNextIdealWeek } from "$lib/week";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return { nextWeek: getNextIdealWeek() };
};
