const ActionsLogMiddleware = store => next => action => {
  console.log(`Action Log:`, action);
  next(action);
};
export default ActionsLogMiddleware;
