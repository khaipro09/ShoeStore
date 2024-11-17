import { createAction } from "@reduxjs/toolkit";
import { REQUEST, TICKET_ACTION } from "../constants";

export const getTicketListAction = createAction(
  REQUEST(TICKET_ACTION.GET_TICKET_LIST)
);
export const createTicketAction = createAction(
  REQUEST(TICKET_ACTION.CREATE_TICKET)
);
export const editTicketAction = createAction(
  REQUEST(TICKET_ACTION.EDIT_TICKET)
);
export const deleteTicketAction = createAction(
  REQUEST(TICKET_ACTION.DELETE_TICKET)
);
