class Predictor {
  constructor(plateNumber, date, time) {
    this.plateNumber = plateNumber;
    this.date = date;
    this.time = time;
  }

  verifyPicoYPlaca() {
    const date = new Date(this.date);
    const dateDayNumber = date.getDay();
    const time = this.time;
    const pnLastDigit = parseInt(
      this.plateNumber.charAt(this.plateNumber.length - 1)
    );

    if (this.isPicoYPlacaDay(dateDayNumber, pnLastDigit)) {
      if (this.isPicoYPlacaHour(time)) return "No puedes circular";

      return "Puedes circular";
    }

    return "Puedes circular";
  }

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

  isPicoYPlacaHour(time) {
    const hour = parseInt(time.substr(0, 2));
    const minute = parseInt(time.substr(3, 5));

    const isMorningPeak =
      hour >= 6 && hour < 10 && (hour !== 9 || minute <= 30);
    const isAfternoonPeak = hour >= 16 && hour < 20;

    return isMorningPeak || isAfternoonPeak;
  }
}

export default Predictor;
