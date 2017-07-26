window.onload = function () {
  var trashCans = document.querySelectorAll('.trash-can')

  for (var index = 0; index < trashCans.length; index++) {
    trashCans[index].addEventListener('click', function (event) {
      var confirmResult = window.confirm('Are you sure you want to delete this review?')

      if (confirmResult) {
        var href = event.target.getAttribute('data-href')
        window.location.href = href
      }
    })
  }
}
