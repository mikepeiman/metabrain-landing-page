/**
 * The metatag currently in focus on the page. Every TagPill for the same tag
 * lights up together, which shows one metatag living in several views at once.
 */
export const tagFocus = $state<{ tag: string | null }>({ tag: null });
