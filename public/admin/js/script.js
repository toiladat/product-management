const buttonList = document.querySelectorAll("[ button-status]")
//tao url voi tham so constructor la 1 href cua url cu
let url = new URL(window.location.href);


// tao su kien click
buttonList.forEach((button) => {
  button.addEventListener('click', () => {
    // lay ra status o nut vua bam
    const statusCurrent = button.getAttribute("button-status")


    //neu status (active/inactive) set lai hoac them status=statusCurrent
    // neu la "" thi xoa status khoi url
    if (statusCurrent)
      url.searchParams.set("status", statusCurrent)
    else
      url.searchParams.delete("status")
    // chay vao duong dan moi
    window.location.href = url.href



  })
})
// set lai active cho buttons
// lay ra value cua status tren url tra ve null neu khong co
const statusButton = url.searchParams.get("status") || ""
//lay nut theo url
// lay ra nui co val cua status tren url
const buttonCurrent = document.querySelector(`[button-status="${statusButton}"]`)
if (buttonCurrent)
  // add class active
  buttonCurrent.classList.add("active")


// tìm theo nhiều tiêu chí
const formSearch = document.querySelector("[form-search]")
if (formSearch) {
  let url = new URL(window.location.href)
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value
    if (keyword) {
      url.searchParams.set("keyword", keyword)
    } else
      url.searchParams.delete("keyword")
    window.location.href = url.href
  })
}

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

// change status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]")
if (listButtonChangeStatus.length > 0) {
  listButtonChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const link = button.getAttribute('link')
      fetch(link, {
          // mac dinh la get
          method: "PATCH",
          headers: {
            'Content-Type': "application/json"
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            window.location.reload()
          }
        })
    })
  })
}
//end change status


// checkAll
const CheckAll = document.querySelector("input[name='checkAll']")
const listCheckItem = document.querySelectorAll("input[name='checkItem']")
// console.log(CheckAll);
if (CheckAll) {
  CheckAll.addEventListener("click", () => {
    listCheckItem.forEach(item => {
      item.checked = CheckAll.checked
    })
  })
}



listCheckItem.forEach(item => {
  item.addEventListener("click", () => {
    const listCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked")
    CheckAll.checked = listCheckItemChecked.length == listCheckItem.length ? true : false
  })
})
// end checkAll


// box actions áp dụng select để chọn cập nhật lại product
const boxActions = document.querySelector("[box-actions]")
if (boxActions) {
  const button = boxActions.querySelector("button")
  button.addEventListener("click", () => {
    const status = boxActions.querySelector('select').value
    const listCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked")
    let ids = []
    listCheckItemChecked.forEach(item => {
      ids.push(item.value)
    })
    if (status != "" && listCheckItemChecked.length > 0) {
      const data = {
        status: status,
        ids: ids
      }
      const link = boxActions.getAttribute("box-actions")
      fetch(link, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            window.location.reload()
          }
        })
    } else
      alert("nhap thong tin")

  })
}
// end box actions

// box-option-trash áp dụng chọn đối tượng đã xóa

const boxActionTrash = document.querySelector('[box-option-trash]')
if (boxActionTrash) {
  boxActionTrash.addEventListener('change', () => {
    const target = boxActionTrash.value
    const link = boxActionTrash.getAttribute('box-option-trash')
    const linkFinal = link + target;
    window.location.href = linkFinal; // Chuyển hướng tới URL đã chọn
  })
}
//end box-option-trash

// selected in box-option-trash
const currentUrl = window.location.pathname;
const target = currentUrl.split('/').pop()
if (boxActionTrash) {
  const defaultSeletct = boxActionTrash.querySelector(`option[value="${target}"]`)
  defaultSeletct.selected = true
}

//end seleted in box-option-trash

//  delete record
const listButtonDelete = document.querySelectorAll('[button-delete]')
if (listButtonDelete.length > 0) {
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("button-delete")
      const target = button.getAttribute('target');

      fetch(`/admin/${target}/delete`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200)
            window.location.reload()
        })
    })
  })
}
// end delete record

// retrieve record 
const listButtonRetrieve = document.querySelectorAll('[button-retrieve]')
listButtonRetrieve.forEach(button => {
  button.addEventListener('click', () => {
    const link = button.getAttribute('link')
    console.log(link);
    fetch(link, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.code == 200)
          window.location.reload()
      })
  })

})

//end retrieve record

// delete parmenant record
const listButtonDelPar = document.querySelectorAll("[button-delete-permanent]")
if (listButtonDelPar.length > 0) {
  listButtonDelPar.forEach(item => {
    item.addEventListener("click", () => {
      const link = item.getAttribute("link")
      fetch(link, {
          method: "DELETE",
          "Content-Type": "application/json"
        })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            window.location.reload()
          }
        })
    })
  })
}

// end delete parmenant record



// change position

const listInputPosition = document.querySelectorAll("input[name='position']")
if (listInputPosition.length > 0) {
  listInputPosition.forEach(input => {
    input.addEventListener('change', () => {
      const position = parseInt(input.value)
      const link = input.getAttribute('link')
      console.log(link);
      fetch(link, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          position: position
        })
      })
    })
  })
}
// end change postiton


// show alert
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
  const time = parseInt(showAlert.getAttribute('show-alert')) || 3000
  setTimeout(() => {
    showAlert.classList.add('hidden')
  }, time);
}
// end show alert

// upload image

const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")

  uploadImageInput.addEventListener("change", () => {
    // const file= uploadImageInput.files[0]
    const [file] = uploadImageInput.files
    if (file) {
      // trả về một URL đặc biệt (blob URL) cho đối tượng file đã được chọn
      uploadImagePreview.src = URL.createObjectURL(file)
      uploadImagePreview.classList.add("image-preview")
    }
  })
}
// end upload image

// sort



const sort = document.querySelector("[sort]")
if (sort) {
  let url = new URL(window.location.href)
  const selectBox = sort.querySelector("[sort-select]")

  selectBox.addEventListener("change", () => {
    const [sortKey, sortValue] = selectBox.value.split('-');
    if (sortKey && sortValue) {
      url.searchParams.set("sortKey", sortKey)
      url.searchParams.set("sortValue", sortValue)

      window.location.href = url.href
    }
  })
}



//set selected cho select
const defaultSortKey = url.searchParams.get("sortKey")
const defaultSortValue = url.searchParams.get("sortValue")
if (defaultSortKey && defaultSortValue) {
  const defaultSeletct = sort.querySelector(`option[value="${defaultSortKey}-${defaultSortValue}"]`)
  defaultSeletct.selected = true
}

// clear lai select
const clearSort = document.querySelector("[sort-clear]")
if (clearSort) {
  clearSort.addEventListener("click", () => {
    url.searchParams.delete("sortKey")
    url.searchParams.delete("sortValue")
    window.location.href = url.href
  })
}
//end sort

// phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]")
  buttonSubmit.addEventListener("click", () => {
    const roles = []
    const roleId = tablePermissions.querySelectorAll("[role-id]")
    for (const element of roleId) {
      const idElement = element.getAttribute("role-id");
      const role = {
        id: idElement,
        permission: []
      }

      const inputCheckedList = tablePermissions.querySelectorAll(`input[data-id="${idElement}"]:checked`)
      inputCheckedList.forEach(item => {
        const dataName = item.getAttribute("data-name")
        role.permission.push(dataName)
      })
      roles.push(role)
    }
    const link = buttonSubmit.getAttribute('button-submit')
    fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(roles)
      })
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  })

}
// hết phân quyền
// const featureList = [{
//     featureTitle: "Quan ly san pham",
//     flags: [
//       {
//         flagTitle: "Xem",
//         flag: "products_view"
//       },
//       {
//         flagTitle: "Them",
//         flag: "products_add"
//       },
//       {
//         flagTitle: "Sua",
//         flag: "products_edit"
//       },
//       {
//         flagTitle: "Xoa",
//         flag: "products_delete"
//       }
//     ]
//   },
//   {
//     featureTitle: "Quan ly Danh muc san pham",
//     flags: [{
//         flagTitle: "Xem",
//         flag: "roles_view"
//       },
//       {
//         flagTitle: "Them",
//         flag: "roles_add"
//       },
//       {
//         flagTitle: "Sua",
//         flag: "roles_edit"
//       },
//       {
//         flagTitle: "Xoa",
//         flag: "roles_delete"
//       },
//       {
//         flagTitle: "Phan quyen",
//         flag: "roles_permission"
//       }
//     ]
//   },
//   {
//     featureTitle: "Quan ly Tai khoan",
//     flags: [{
//         flagTitle: "Xem",
//         flag: "accounts_view"
//       },
//       {
//         flagTitle: "Them",
//         flag: "accounts_add"
//       },
//       {
//         flagTitle: "Sua",
//         flag: "accounts_edit"
//       },
//       {
//         flagTitle: "Xoa",
//         flag: "accounts_delete"
//       },
//       {
//         flagTitle: "Phan quyen",
//         flag: "accounts_permission"
//       }
//     ]
//   }
// ]