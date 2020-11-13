(async () => {
  const graphs = await getData("./Data/graphs.json", true);

  for (const graph of graphs) {
    option = $(`<div class="option">${graph.name}</div>`).appendTo("#options");
    option.on("click", async () => {
      const text = await getData(graph.file);
      const data = parseData(text);
      console.log(data);
    });
  }
})();