import Helpers from './helpers.js';

export default class ExchangeApiClient {
  constructor() {
    this.url = {
      address: 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/',
      currency: 145
    };
  }

  async fetchDailyRates(amount) {
    const startDate = Helpers.dateFromPast(amount);
    const endDate = Helpers.currentDate();
    const url = `${this.url.address}${this.url.currency}?startDate=${startDate}&endDate=${endDate}`;
    const request = new Request(url);
    const response = await fetch(request);
    return await response.json();
  }
}