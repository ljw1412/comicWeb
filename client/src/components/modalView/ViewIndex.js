// let index = 0

// function indexIncrease() {
//   index++
// }

// export { index, indexIncrease }

class ViewIndex {
  constructor() {
    this.index = 0
  }

  indexIncrease() {
    this.index++
  }

  getIndex() {
    return this.index
  }
}

const viewIndex = new ViewIndex()

export default viewIndex
