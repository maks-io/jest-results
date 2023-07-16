export const createSafeString = (s: string) => {
  let safeString = s.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  if (safeString[safeString.length - 1] === "-") {
    safeString = safeString.slice(0, -1);
  }
  return safeString;
};
