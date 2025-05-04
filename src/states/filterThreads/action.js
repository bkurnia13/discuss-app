const ActionType = {
  SET_FILTER_THREADS: 'SET_FILTER_THREADS',
};

function setFilterThreadsActionCreator({ threads = [], activeCategory = [] }) {
  console.log(threads, activeCategory);

  return {
    type: ActionType.SET_FILTER_THREADS,
    payload: {
      threads,
      activeCategory,
    },
  };
}

export { ActionType, setFilterThreadsActionCreator };
