export const isEmptyString = (str) => {
  return !str || (typeof str === "string" && str.trim().length === 0);
};

export const stringAvatar = (name) => {
  return {
    children: `${name?.split(" ")?.[0]?.[0]?.toUpperCase() || ""}${
      name?.split(" ")?.[1]?.[0]?.toUpperCase() || ""
    }`,
  };
};
