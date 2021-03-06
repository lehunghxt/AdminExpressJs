module.exports.pagination = (url, total, current) => {
    const regex = /[&|?]page=\d+/i;
    url = url.replace(regex, '');
    url = url.length > 6 ? `${url}&page=` : `${url}?page=`;
    var pagi = `<div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Trang ${current} trong ${total} trang
      </div>
    </div>
    <div class="col-md-12">
        <ul class="pagination  d-flex justify-content-center">
          <li class="paginate_button page-item previous ${current == 1 ? 'disabled' : ''}">
            <a href="${url}${parseInt(current) - 1}" class="page-link">Trước</a></li>`;
              var IS_SHOW_DOT = 1;
              for(var i = 1; i <= total; i++){
                if(i <= 2 || (i >= parseInt(current) - 1 && i <= parseInt(current) + 1) || i == total){
                  pagi += `<li class="paginate_button page-item ${i == current ? 'active' : ''}"><a href="${url}${i}" class="page-link">${i}</a></li>`;
                  IS_SHOW_DOT=1;
                }else{
                  if(parseInt(IS_SHOW_DOT) == 1){
                    pagi += `<li class="paginate_button page-item ${i == current ? 'active' : ''}"><a href="${url}${i}" class="page-link">...</a></li>`;
                  }
                  IS_SHOW_DOT++;
                }
              }
    pagi += `<li class="paginate_button page-item next ${current == total ? 'disabled' : ''}" id="dataTable_next">
              <a href="${url}${parseInt(current) + 1}" class="page-link">Tiếp</a>
            </li></ul></div></div>`;
    return pagi;
}
module.exports.sequenNumber = (currentPage, index) => {
    return (parseInt(index) + 1)+(parseInt(currentPage) - 1) * 10;
}
module.exports.compareString = (a, b, output) => {
  return a == b ? output : '';
}
module.exports.handleGender = (gender) => {
  return gender == 'male' ? 'nam' : 'nữ';
}
module.exports.showTitle = (title) => {
    return title ? title : 'Admin CURD';
  }

  module.exports.validateErr = (err, type) => {
    if(!err) return '';
    const finded = err.find((item) => {
        return item.param == type
    })
    return finded ? finded.msg : '';
  }
  module.exports.validateErrClass = (err, type, output) => {
    if(!err) return '';
    const finded = err.find((item) => {
        return item.param == type
    })
    return finded ? output : '';
  }

