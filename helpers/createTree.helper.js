const createTree = (categories, parentId = "") => {
  const newArray = []
  for (let item of categories) {
    if (item. parent_id == parentId) {
      const childrenArray = createTree(categories, item.id)
      if (childrenArray.length > 0) {
        item.children = childrenArray
      }
      newArray.push(item)
    }
   
  }
  return newArray
}
module.exports=(categories)=>{
  const array=createTree(categories,parentId="")
  return array
}