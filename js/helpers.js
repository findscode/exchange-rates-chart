export default class Helpers {
  static currentDate() {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }

  static dateFromPast(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo + 1);
    return date.toISOString().slice(0, 10);
  }
}