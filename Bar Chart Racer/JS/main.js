var playing;

(async () => {
  const graphs = await getData("./Data/graphs.json", true);
  for (const graph of graphs) {
    const option = $(`<div class="option">${graph.name}</div>`).appendTo("#options");
    option.on("click", async () => {
      const text = await getData(graph.file);
      const data = parseData(text);
      playing = data.title;
      setup(data);
      var i = 0;
      const frame = () => {
        draw(data.timestamps[i]);
        i++;
        if (playing == data.title && i < data.timestamps.length)
          setTimeout(frame, 20);
      }
      frame();
    });
  }
})();