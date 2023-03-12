(function ($) {
  console.log("Jumlah Icon: " + $(".icon").length);
  const ubahLabel = (function () {
    var label = $(".icon .label");
    for (let i = 0; i < label.length; i++) {
      let labelClass = $(label[i]).text();
      labelClass = labelClass.replace(/-/g, " ");
      $(label[i]).text(labelClass);
    }
  })();

  //   copy to clipboard
  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert(`${text} copied to clipboard`);
  }

  $(".icon").click(function () {
    let thisClass = $(this).find("i").attr("class");
    let html = `<i class="${thisClass}"></i>`;
    copyToClipboard(html);
  });

  //   search icon
  const inputSearch = document.getElementById("navbarInput");
  inputSearch.value = "";

  function cariIcon() {
    let katakunci = inputSearch.value;
    let label = $(".icon .label");
    for (let i = 0; i < label.length; i++) {
      let labelClass = $(label[i]).text();
      if (labelClass.includes(katakunci)) {
        $(label[i]).parent().show();
      } else {
        $(label[i]).parent().hide();
      }
    }
  }

  inputSearch.addEventListener("input", cariIcon);
})(jQuery);
