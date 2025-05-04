export default function popularCategory(threads = []) {
  const resultCountCategory = [];

  const categories = threads
    .map((thread) => {
      return {
        name: thread.category.toLowerCase(),
        count: 1,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  categories.forEach((current) => {
    const index = resultCountCategory.findIndex((item) => item.name === current.name);
    if (index !== -1) {
      resultCountCategory[index].count = resultCountCategory[index].count + current.count;
    } else {
      resultCountCategory.push(current);
    }
  });

  return resultCountCategory.sort((a, b) => b.count - a.count);
}
