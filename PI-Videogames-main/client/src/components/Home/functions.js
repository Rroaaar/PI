export function alphabeticSort(array, order){
    let alphabeticArray = array.sort((a,b)=>{
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    })
    if(order === "ASC") return alphabeticArray
    if(order === "DES") return alphabeticArray.reverse()
}

export function ratingSort(array, order){
    let alphabeticArray = array.sort((a,b)=>{
        if(a.rating < b.rating) return -1
        if(a.rating > b.rating) return 1
        return 0
    })
    if(order === "DES") return alphabeticArray
    if(order === "ASC") return alphabeticArray.reverse()
}

export function sortBySimilarity(arr, searchString) {
    const searchLower = searchString.toLowerCase();
    const searchRegex = new RegExp(searchLower, 'g');
  
    function getSimilarityScore(name) {
      const lowerName = name.toLowerCase();
      const matchCount = (lowerName.match(searchRegex) || []).length;
      const similarityScore = lowerName.includes(searchLower) ? matchCount + 1 : matchCount;
      return similarityScore;
    }
  
    arr.sort((a, b) => {
      const similarityA = getSimilarityScore(a.name);
      const similarityB = getSimilarityScore(b.name);
  
      return similarityB - similarityA;
    });
  
    return arr;
  }