const ActionType = {
  SET_FILTER_THREADS: 'filterThreads/set',
};

function setFilterThreadsActionCreator({ threads = [], activeCategory = [] }) {
  return {
    type: ActionType.SET_FILTER_THREADS,
    payload: {
      threads,
      activeCategory,
    },
  };
}

export { ActionType, setFilterThreadsActionCreator };
