/**
 * @typedef {import('@reduxjs/toolkit').Dispatch} Dispatch
 * @typedef {import('@reduxjs/toolkit').Action} Action
 * @typedef {import('../types').GetStateFunction} GetStateFunction
 */

/**
 * @typedef {object} HandleActionLogicProps
 * @property {Dispatch} dispatch
 * @property {GetStateFunction} getState
 * @property {Action} action
 */

/**
 * @typedef {object} CreateMiddlewareProps
 * @property {string} [uniquePrefix] defaults to '*'
 * @property {(props: HandleActionLogicProps) => void} handleActionLogic
 * @property {boolean} [isNextFirst] defaults to `true`
 */

/** @param {CreateMiddlewareProps} props */
function createMiddleware({ uniquePrefix = '*', handleActionLogic, isNextFirst = true }) {
  const regex = uniquePrefix === '*' ? /.?/ : new RegExp(`^\\[${uniquePrefix}]`); // <--- For example: [backMsgs]

  /**
   * @param {Action} action
   * @returns {boolean}
   */
  function shouldThisMiddlewareHandleTheAction(action) {
    return regex.test(action.type);
  }

  function reduxEnhancerReturnsAMiddleware({ dispatch, getState }) {
    return function reduxMiddleware(next) {
      return isNextFirst
        ? function actBasedOnAction(action) {
            next(action);

            if (shouldThisMiddlewareHandleTheAction(action)) handleActionLogic({ dispatch, getState, action });
          }
        : function actBasedOnAction(action) {
            if (shouldThisMiddlewareHandleTheAction(action)) handleActionLogic({ dispatch, getState, action });

            next(action);
          };
    };
  }

  return reduxEnhancerReturnsAMiddleware;
}

export { createMiddleware };
