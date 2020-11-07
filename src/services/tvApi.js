import axios from 'axios';
require('dotenv').config();

const sub = process.env.SUB;
const user = process.env.USER;
const pass = process.env.PASS;

const auth = {
  username: user,
  password: pass,
};

export const baseUrl = `https://${sub}.zendesk.com`;
export const ticketsUrl = `${baseUrl}/api/v2/tickets.json`;
export const ticketIdUrl = `${baseUrl}/api/v2/tickets/{id}.json`;

export const getTicketIds = async () => {
  const result = await axios.get(ticketsUrl).then((data) => data);

  return result;
};
