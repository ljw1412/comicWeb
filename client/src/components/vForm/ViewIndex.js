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
