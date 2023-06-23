// jQuery variables
const $options = $("#options");
const $popupwrapper = $("#popup-wrapper");

// Global variables
var graphNum = 0;
const baseFPS = 30;
var FPS = baseFPS;

// Function to start graph animation
function makeGraph(text, json = false) {
  const data = json ? sortData(text) : parseData(text);
  graphNum++;
  var localGraphNum = graphNum;
  setup(data);
  var t = 0;
  const frame = () => {
    draw(data.timestamps[t]);
    t++;
    if (localGraphNum != graphNum ||
      t >= data.timestamps.length) return;
    setTimeout(frame, FPS);
  }
  frame();
}

// Function to handle custom file
function handleFile(obj) {
  if (!obj) return;
  const reader = new FileReader();
  reader.readAsText(obj.files[0]);
  reader.onload = () => {
    const json = obj.files[0].type == "application/json";
    const result = json ? JSON.parse(reader.result) : reader.result;
    makeGraph(result, json);
    $popupwrapper.fadeOut(200);
  };
}

(async () => {
  const graphs = await getData("./Data/graphs.json", true);
  for (const graph of graphs) {
    const option = $(`<div class="option">${graph.name}</div>`).appendTo($options);
    const text = await getData(graph.file);
    const json = /\.json/.test(graph.file);
    option.on("click", () =>
      makeGraph(json ? JSON.parse(text) : text, json));
  }
})();