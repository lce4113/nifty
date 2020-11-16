// jQuery variables
const $options = $("#options");
const $choosefile = $("#choose-file");
const $popupwrapper = $("#popup-wrapper");
const $fileinputelt = $popupwrapper.find("#file-input>input[type='file']");
const $draganddrop = $popupwrapper.find("#drag-and-drop");

// Global variables
var graphNum = 0;

// Function to start graph animation
async function makeGraph(text) {
  const data = parseData(text);
  graphNum++;
  var localGraphNum = graphNum;
  setup(data);
  var t = 0;
  const frame = () => {
    draw(data.timestamps[t]);
    t++;
    if (localGraphNum != graphNum ||
      t >= data.timestamps.length) return;
    setTimeout(frame, 20);
  }
  frame();
}

// Function to handle custom file
function handleFile(obj) {
  if (!obj) return;
  const reader = new FileReader();
  reader.readAsText(obj.files[0]);
  reader.onload = () => {
    makeGraph(reader.result);
    $popupwrapper.fadeOut(200);
  };
}

(async () => {
  const graphs = await getData("./Data/graphs.json", true);
  for (const graph of graphs) {
    const option = $(`<div class="option">${graph.name}</div>`).appendTo($options);
    const text = await getData(graph.file);
    option.on("click", async () => await makeGraph(text));
  }
  $choosefile.on("click", function () {
    $popupwrapper.fadeIn(200);
    $(window).on("click", e => {
      if (["popup-wrapper", "close-popup"].includes(e.target.id))
        $popupwrapper.fadeOut(200)
    });
    $fileinputelt.on("change", function () { handleFile(this); });
  });
  $draganddrop.on("dragover dragenter", (e) => {
    e.preventDefault();
    $draganddrop.css("background", "rgba(0, 0, 0, 0.3)");
  });
  $draganddrop.on("dragleave", () =>
    $draganddrop.css("background", "none"));
  $draganddrop.on("drop dragdrop", (e) => {
    e.preventDefault();
    $draganddrop.css("background", "none");
    handleFile(e.dataTransfer);
  });
})();