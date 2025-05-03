// const resultCountCategory = [];

// function countCategory(current) {
//   const index = resultCountCategory.findIndex((item) => item.category === current.category);

//   if (index !== -1) {
//     resultCountCategory[index].count = resultCountCategory[index].count + current.count;
//   } else {
//     resultCountCategory.push(current);
//   }
// }

export default function popularCategory(threads = []) {
  const resultCountCategory = [];

  const categories = threads
    .map((thread) => {
      return {
        category: thread.category.toLowerCase(),
        count: 1,
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category));

  categories.forEach((current) => {
    const index = resultCountCategory.findIndex((item) => item.category === current.category);
    if (index !== -1) {
      resultCountCategory[index].count = resultCountCategory[index].count + current.count;
    } else {
      resultCountCategory.push(current);
    }
  });

  return resultCountCategory.sort((a, b) => b.count - a.count);
}
