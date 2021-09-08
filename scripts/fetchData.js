const fetchData = async (url) => {
  const data = await fetch(url).then(async (response) => {
    return response.json();
  });
  return data;
};

export default fetchData;