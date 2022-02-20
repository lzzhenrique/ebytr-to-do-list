const sortFuncs = {
  date: (userTasks, setTasks) => {
    const order = userTasks.sort((a, b) => {
      const taskADate = new Date(a.createdAt);
      const taskBDate = new Date(b.createdAt);
      return taskADate - taskBDate;
    });
    setTasks([...order]);
  },
  alpha: (userTasks, setTasks) => {
    const order = userTasks.sort((a, b) => {
      const taskATitle = a.title.toLowerCase();
      const taskBTitle = b.title.toLowerCase();
      const LESS = -1;
      if (taskATitle < taskBTitle) return LESS;
      if (taskATitle > taskBTitle) return 1;
      return 0;
    });
    setTasks([...order]);
  },
  status: (userTasks, setTasks) => {
    const order = userTasks.sort((a, b) => {
      const taskAStatus = a.status.toLowerCase();
      const taskBStatus = b.status.toLowerCase();
      const LESS = -1;

      if (taskAStatus < taskBStatus) return LESS;
      if (taskAStatus > taskBStatus) return 1;
      return 0;
    });
    setTasks([...order]);
  },
};

export default sortFuncs;
