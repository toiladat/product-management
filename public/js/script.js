// pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]")

if (listButtonPagination.length > 0) {
  let url = new URL(window.location.href)

  listButtonPagination.forEach(item => {
    item.addEventListener('click', () => {
      const buttonNumber = item.getAttribute('button-pagination')
      url.searchParams.set("page", buttonNumber)
      window.location.href = url.href
    })
  })
}
// end pagination

