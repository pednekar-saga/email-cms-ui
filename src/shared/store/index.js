export const setItem = (name, value) => {
   window.localStorage.setItem(name, value);
};

export const getItem = name => {
   return window.localStorage.getItem(name)
      ? window.localStorage.getItem(name)
      : "";
};
