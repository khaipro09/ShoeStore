import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from "../constants";

const initialState = {
  userList: {
    data: [],
    load: false,
    error: null,
  },

  userInfo: {
    data: {},
    load: false,
    error: null,
  },
  responseAction: {
    edit_user: {
      load: false,
      error: null,
    },
    login: {
      load: false,
      error: null,
    },
    register: {
      load: false,
      error: null,
    },
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST(USER_ACTION.LOGIN): {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          login: {
            ...state.responseAction.login,
            load: true,
            error: null,
          },
        },
      };
    }
    case SUCCESS(USER_ACTION.LOGIN): {
      const { data } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          login: {
            ...state.responseAction.login,
            load: false,
            error: null,
          },
        },
        userInfo: {
          ...state.userInfo,
          data,
        },
      };
    }
    case FAILURE(USER_ACTION.LOGIN): {
      const { error } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          login: {
            ...state.responseAction.login,
            load: false,
            error,
          },
        },
      };
    }

    case REQUEST(USER_ACTION.LOGOUT): {
      return {
        ...state,
        userInfo: {
          data: {},
          load: false,
          error: null,
        },
      };
    }

    case REQUEST(USER_ACTION.REGISTER): {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          register: {
            ...state.responseAction.register,
            load: true,
            error: null,
          },
        },
      };
    }
    case FAILURE(USER_ACTION.REGISTER): {
      const { error } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          register: {
            ...state.responseAction.register,
            load: false,
            error,
          },
        },
      };
    }

    case REQUEST(USER_ACTION.GET_USER_INFO): {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
          error: null,
        },
      };
    }
    case SUCCESS(USER_ACTION.GET_USER_INFO): {
      const { data: rowData } = action.payload;
      const { dataObject } = rowData;
      const data = { data: dataObject };
    
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data,
          load: false,
          error: null,
        },
      };
    }
    
    
    case FAILURE(USER_ACTION.GET_USER_INFO): {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error,
        },
      };
    }

    case REQUEST(USER_ACTION.GET_USER_LIST): {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      };
    }
    case SUCCESS(USER_ACTION.GET_USER_LIST): {
      const { data } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          data,
          load: false,
          error: null,
        },
      };
    }
    case FAILURE(USER_ACTION.GET_USER_LIST): {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          load: false,
          error,
        },
      };
    }
    case SUCCESS(USER_ACTION.EDIT_USER): {
      const { data } = action.payload;
      const newUserList = [...state.userList.data];
      const userIndex = newUserList.findIndex((user) => user.id === data.id);
      newUserList.splice(userIndex, 1, data);
      return {
        ...state,
        userList: {
          ...state.userList,
          data: newUserList,
        },
      };
    }

    case REQUEST(USER_ACTION.EDIT_USER_PROFILE): {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          edit_user: {
            ...state.responseAction.edit_user,
            load: true,
            error: null,
          },
        },
      };
    }
    case SUCCESS(USER_ACTION.EDIT_USER_PROFILE): {
      const { data } = action.payload;
      const newData = data.dataObject;
      const newUserList = [...state.userList.data];
      const userIndex = newUserList.findIndex((user) => user.id === data.id);
      newUserList.splice(userIndex, 1, data);
      return {
        ...state,
        userList: {
          ...state.userList,
          data: newUserList,
        },
        userInfo: {
          ...state.userInfo,
          data: {data: newData},
        },
        responseAction: {
          ...state.responseAction,
          edit_user: {
            ...state.responseAction.edit_user,
            load: false,
            error: null,
          },
        },
      };
    }
    case FAILURE(USER_ACTION.EDIT_USER_PROFILE): {
      const { error } = action.payload;
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          edit_user: {
            ...state.responseAction.edit_user,
            load: false,
            error,
          },
        },
      };
    }
    default:
      return state;
  }
}

export default userReducer;
