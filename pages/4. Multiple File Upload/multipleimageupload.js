var ImgMultiple = ($.fn.ImgMultiple = function (options) {
  var settings = $.extend(
    {
      maxFile: 3,
      fileAllowed: ['jpg', 'jpeg', 'png', 'jfif', 'gif', 'bmp'],
      sizePerFile: 5120,
      nameObj: 'file[]',
    },
    options
  );

  var $this = $(this);
  var html = `<div class="item">
                    <input type="file" name="${settings.nameObj}" id="" class="file">
                    <img src="">
                    <div class="action">
                        <i class="fa fas fa-xmark delete_btn"></i>
                        <i class="fa fas fa-plus add_btn"></i>
                    </div>
               </div>`;

  var addItem = function () {
    var item = $this.find('.item');

    if (item.length < settings.maxFile) {
      var emptyItem = $this
        .find(".item input[type='file']")
        .filter(function () {
          return this.value == '';
        });

      if (emptyItem.length == 0) {
        $this.append(html);
      }
    }
  };

  addItem();

  // tooltip init
  function myTooltip() {
    $('.tooltip').remove();
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  //   validation function
  function validation(input, selector) {
    let file = input[0].files[0];
    let fileExt = file.name.split('.').pop().toLowerCase();
    let fileSize = file.size / 1024;

    if (settings.fileAllowed.indexOf(fileExt) == -1) {
      alert('File type not allowed');
      input.val('');
      selector.removeClass('filled');
      selector.find('img').attr('src', '');
    } else if (fileSize > settings.sizePerFile) {
      alert('File size too large');
      selector.removeClass('filled');
      input.val('');
      selector.find('img').attr('src', '');
    } else {
      let reader = new FileReader();
      reader.onload = function (e) {
        selector.addClass('filled');
        selector.find('img').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
      let namaFile = input.val().split('\\').pop();
      return namaFile;
    }
  }

  $(document).on('change', ".item input[type='file']", function () {
    var selector = $(this).parent();
    var inputTag = selector.find('input[type="file"]');
    validation(inputTag, selector);
    if (validation(inputTag, selector)) {
      $(this)
        .parent()
        .find('.action')
        .attr('data-bs-toggle', 'tooltip')
        .attr('data-bs-title', validation(inputTag, selector))
        .attr('data-bs-placement', 'bottom')
        .attr('data-bs-custom-class', 'custom-tooltip');

      myTooltip();
      addItem();
    }
  });

  $(document).on('click', '.item .add_btn', function () {
    var selector = $(this).parent().parent();
    var inputTag = selector.find('input[type="file"]');
    inputTag.click();
  });

  $(document).on('click', '.item .delete_btn', function () {
    var selector = $(this).parent().parent();
    let confirmDelete = confirm('Are you sure to delete this item?');
    if (confirmDelete) {
      selector.remove();
      addItem();
      myTooltip();
    } else {
      return false;
    }
  });

  //   end of class
});
