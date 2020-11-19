// jQuery variables
const $speedbuttons = $(".speed-button");
const $choosefile = $("#choose-file");
const $fileinputelt = $popupwrapper.find("#file-input>input[type='file']");
const $draganddrop = $popupwrapper.find("#drag-and-drop");
const $codeexamples = $popupwrapper.find("#file-format>div>code");


// mincities.json and mincities.txt examples
(async () => {
  var citiesTXT = await getData("./Data/mincities.txt");
  var citiesJSON = JSON.stringify(await getData("./Data/mincities.json", true));
  htmlify = s => {
    return `<code>${s.replace(/\s/g, '&nbsp;')
      .replace(/\n/g, '<br>')}</code>`;
  }
  $codeexamples.eq(0).html(htmlify(citiesTXT));
  $codeexamples.eq(1).html(htmlify(citiesJSON));
})();


// Choose file popup
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

// Speed buttons
$speedbuttons.on("click", function () {
  const num = this.innerText.match(/[\d\.]+/)[0];
  FPS = baseFPS / num;
});