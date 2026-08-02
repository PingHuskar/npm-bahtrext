export default (str, x) => x.reduce((acc, i) => acc.repeat(i), `${str}`);
