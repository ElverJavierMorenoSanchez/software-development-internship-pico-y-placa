/**
 * Class representing a predictor for Pico y Placa.
 */
class Predictor {
  /**
   * Create a predictor.
   * @param {string} plateNumber - The plate number of the vehicle.
   * @param {string} date - The date in format "YYYY-MM-DD".
   * @param {string} time - The time in format "HH:MM".
   */
  constructor(plateNumber, date, time) {
    this.plateNumber = plateNumber;
    this.date = date;
    this.time = time;
  }

  /**
   * Verify if the vehicle can be on the road based on Pico y Placa rules.
   * @returns {boolean} - True if the vehicle can't be on the road, false otherwise.
   */
  verifyPicoYPlaca() {
    const date = new Date(this.date);
    const dateDayNumber = date.getDay();
    const time = this.time;
    const pnLastDigit = parseInt(
      this.plateNumber.charAt(this.plateNumber.length - 1)
    );

    if (this.isPicoYPlacaDay(dateDayNumber, pnLastDigit)) {
      if (this.isPicoYPlacaHour(time)) return true;

      return false;
    }

    return false;
  }

  /**
   * Check if the day and last digit of the plate number are in the Pico y Placa rules.
   * @param {number} dateDayNumber - The day number of the date (0-6, where 0 is Monday).
   * @param {number} pnLastDigit - The last digit of the plate number.
   * @returns {boolean} - True if the day and last digit are in the Pico y Placa rules, false otherwise.
   */
  isPicoYPlacaDay(dateDayNumber, pnLastDigit) {
    const picoYPlacaRules = {
      0: [1, 2],
      1: [3, 4],
      2: [5, 6],
      3: [7, 8],
      4: [9, 0],
    };

    return picoYPlacaRules[dateDayNumber].includes(pnLastDigit);
  }

  /**
   * Check if the time is in the Pico y Placa peak hours.
   * @param {string} time - The time in format "HH:MM".
   * @returns {boolean} - True if the time is in the Pico y Placa peak hours, false otherwise.
   */
  isPicoYPlacaHour(time) {
    const hour = parseInt(time.substr(0, 2));
    const minute = parseInt(time.substr(3, 5));

    const isMorningPeak =
      hour >= 6 && hour < 10 && (hour !== 9 || minute <= 30);

    const isAfternoonPeak =
      hour >= 16 && hour < 20 && (hour !== 19 || minute <= 30);

    return isMorningPeak || isAfternoonPeak;
  }
}

export default Predictor;
