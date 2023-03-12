var customMyFunc = ($.fn.customMyFunc = function (options) {
  const Archives = ['zip', 'rar', '7z', 'iso'];
  const Audios = ['mp3', 'wav', 'ogg', 'wma', 'aac', 'flac', 'm4a'];
  const Documents = ['doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'];
  const Images = ['jpg', 'jpeg', 'png', 'jfif', 'gif', 'bmp'];
  const Videos = ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm'];
  var settings = $.extend(
    {
      maxFile: 3,
      fileAllowed: 'Images',
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

  //   validation function
  function validation(input, selector) {
    let file = input[0].files[0];
    let fileExt = file.name.split('.').pop().toLowerCase();
    let fileSize = file.size / 1024;

    // Jika fileAllowed = Images
    if (settings.fileAllowed == 'Images') {
      let allowedExt = Images;
      if (allowedExt.indexOf(fileExt) == -1) {
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
        return true;
      }
    }

    // Jika fileAllowed = Documents
    if (settings.fileAllowed == 'Documents') {
      let allowedExt = Documents;
      if (allowedExt.indexOf(fileExt) == -1) {
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
        let urlXls = 'logos/documents/excel.png';
        let urlDocx = 'logos/documents/word.png';
        let urlTxt = 'logos/documents/txt.png';
        let urlPdf = 'logos/documents/pdf.png';
        let urlPpt = 'logos/documents/ppt.png';
        if (fileExt == 'xls' || fileExt == 'xlsx') {
          selector.find('img').attr('src', urlXls);
        } else if (fileExt == 'doc' || fileExt == 'docx') {
          selector.find('img').attr('src', urlDocx);
        } else if (fileExt == 'txt') {
          selector.find('img').attr('src', urlTxt);
        } else if (fileExt == 'pdf') {
          selector.find('img').attr('src', urlPdf);
        } else if (fileExt == 'ppt' || fileExt == 'pptx') {
          selector.find('img').attr('src', urlPpt);
        }
        selector.addClass('filled');
        return true;
      }
    }

    // Jika fileAllowed = Archives
    if (settings.fileAllowed == 'Archives') {
      let allowedExt = Archives;
      if (allowedExt.indexOf(fileExt) == -1) {
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
        let urlZip = 'logos/archives/zip.png';
        let urlRar = 'logos/archives/rar.png';
        let url7z = 'logos/archives/7z.png';
        let urlIso = 'logos/archives/iso.png';

        if (fileExt == 'zip') {
          selector.find('img').attr('src', urlZip);
        } else if (fileExt == 'rar') {
          selector.find('img').attr('src', urlRar);
        } else if (fileExt == '7z') {
          selector.find('img').attr('src', url7z);
        } else if (fileExt == 'iso') {
          selector.find('img').attr('src', urlIso);
        }
        selector.addClass('filled');
        return true;
      }
    }
  }

  $(document).on('change', ".item input[type='file']", function () {
    var selector = $(this).parent();
    var inputTag = selector.find('input[type="file"]');
    validation(inputTag, selector);
    if (validation(inputTag, selector) == true) {
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
    } else {
      return false;
    }
  });

  //   end of class
});
