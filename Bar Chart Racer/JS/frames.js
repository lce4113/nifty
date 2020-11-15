function setup(data) {
  console.log(data);
  $("#title").text(data.title);
}

function draw(stamp) {
  $("#graph").empty();
  for (const bar of stamp.bars) {
    if (bar.value > 0) {
      $("#graph").append(`
<div class="bar-wrapper">
  <div class="bar">
    <div class="name">${bar.name}</div>
  </div>
  <div class="value">${bar.value}</div>
</div>`);
    }
  }
}