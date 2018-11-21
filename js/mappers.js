class Mappers {
  static mapNbrbResponse(response) {
    console.log(response);
    return response.map(datum => {
      return {
        currencyId: datum.Cur_ID,
        date: datum.Date,
        rate: datum.Cur_OfficialRate
      }
    })
  }
}