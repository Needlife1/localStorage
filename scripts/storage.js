function save(key, value) {
  try {
    const serializeedData = JSON.stringify(value);
    localStorage.setItem(key, serializeedData);
  } catch (arr) {
    console.log(err);
  }
}

function load(key) {
  try {
    const serializeedState = localStorage.getItem(key);
    return serializeedState === null ? undefined : JSON.parse(serializeedState);
  } catch (arr) {
    console.log(err);
  }
}

export { save, load };
