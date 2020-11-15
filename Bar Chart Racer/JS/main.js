// jQuery variables
const $options = $("#options");
const $choosefile = $("#choose-file");
const $popupwrapper = $("#popup-wrapper");
const $fileinputelt = $popupwrapper.find("#file-input>input[type='file']");

var playing;

async function makeGraph(text) {
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
    $fileinputelt.on("change", async function () {
      const reader = new FileReader();
      reader.readAsText(this.files[0]);
      reader.onload = () => {
        makeGraph(reader.result);
        $popupwrapper.fadeOut(200);
      };
    });
  });
})();