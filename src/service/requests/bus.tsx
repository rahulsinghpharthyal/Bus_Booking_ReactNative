import apiClient from '../apiClient';

interface BookTicketData {
  busId: string;
  date: string;
  seatNumbers: number;
}

export const fetchBuses = async (from: string, to: string, date: string) => {
  const { data } = await apiClient.post('/api/v1/bus/searchbus', {
    from,
    to,
    date,
  });
  return data?.data || {};
};

export const fetchBusDetails = async (busId: string) => {
  const { data } = await apiClient.get(`/api/v1/bus/${busId}`);
  return data?.data || {};
};

export const fetchUserTickets = async () => {
  const { data } = await apiClient.get('/api/v1/ticket/my-tickets');
  console.log('this is data for ticktes', data)
  return data.tickets;
};

export const bookTicket = async ({
  busId,
  date,
  seatNumbers,
}: BookTicketData) => {
  const { data } = await apiClient.post('/api/v1/ticket/bookticket', {
    busId,
    date,
    seatNumbers,
  });
    return data?.ticket;
};
