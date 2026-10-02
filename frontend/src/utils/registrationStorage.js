/**
 * DEPRECATED & UNUSED
 * --------------------
 * LocalStorage is no longer used for event registrations.
 * MongoDB Atlas via the Express REST API (/api/registrations and /api/events)
 * is now the single source of truth for all event registrations.
 *
 * These stub methods are maintained solely to prevent broken imports if any
 * external or cached reference exists.
 */

export const getAllRegisteredEvents = () => {
  return {};
};

export const getRegisteredEvent = () => {
  return null;
};

export const saveRegisteredEvent = () => {
  // No-op: LocalStorage persistence of registrations is disabled.
};
