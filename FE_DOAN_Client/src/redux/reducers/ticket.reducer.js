import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAILURE, TICKET_ACTION } from "../constants";

const initialState = {
  ticketList: {
    data: [],
    load: false,
    error: null,
  },
};

const ticketReducer = createReducer(initialState, {
  [REQUEST(TICKET_ACTION.GET_TICKET_LIST)]: (state, action) => {
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        load: true,
      },
    };
  },
  [SUCCESS(TICKET_ACTION.GET_TICKET_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      ticketList: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(TICKET_ACTION.GET_TICKET_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        load: false,
        error,
      },
    };
  },

  [SUCCESS(TICKET_ACTION.CREATE_TICKET)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        data: [data, ...state.ticketList.data],
      },
    };
  },

  [SUCCESS(TICKET_ACTION.EDIT_TICKET)]: (state, action) => {
    const { data } = action.payload;
    const newTicketList = [...state.ticketList.data];
    const ticketIndex = newTicketList.findIndex(
      (ticket) => ticket.id === data.id
    );
    newTicketList.splice(ticketIndex, 1, data);
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        data: newTicketList,
      },
    };
  },

  [SUCCESS(TICKET_ACTION.DELETE_TICKET)]: (state, action) => {
    const { id } = action.payload;
    const newTicketList = [...state.ticketList.data];
    const ticketIndex = newTicketList.findIndex((ticket) => ticket.id === id);
    newTicketList.splice(ticketIndex, 1);
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        data: newTicketList,
      },
    };
  },
});

export default ticketReducer;
