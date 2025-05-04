import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategoryActionCreator } from '../states/activeCategory/action';

export default function PopularCategory() {
  const dispatch = useDispatch();
  const isLoading = useSelector((states) => states.isLoading);
  const categories = useSelector((states) => states.categories);
  const activeCategory = useSelector((states) => states.activeCategory);

  const onCategoryClick = () => {
    dispatch(setActiveCategoryActionCreator(event.target.dataset.category));
  };

  return (
    <div className="card w-full bg-base-200 card-md shadow-md my-6">
      <div className="card-body">
        <h2 className="card-title">Kategori Popular</h2>
        {isLoading.skeleton ? (
          <div className="skeleton h-8 w-full"></div>
        ) : (
          <div>
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={
                  activeCategory.includes(category.name)
                    ? 'category-button-active'
                    : 'category-button-class'
                }
                data-category={category.name}
                onClick={() => onCategoryClick()}
              >
                {`#${category.name} (${category.count})`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
