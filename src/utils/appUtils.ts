export const createRequestActionTypes = (prefix: string) => ({
    TRIGGER: `${prefix}_TRIGGER`,
    SUCCESS: `${prefix}_SUCCESS`,
    ERROR: `${prefix}_ERROR`,
    RESET: `${prefix}_RESET`
  }); 
  
  export const action = (type: string, payload = {}) => ({ type, ...payload });