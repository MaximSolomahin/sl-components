import {LitElement, css, html} from '../../lib/lit.js'

const NUMERIC = 'numeric';
const TWO_DIGIT = '2-digit';
const NARROW = 'narrow';
const SHORT = 'short';
const LONG = 'long';

const MONTHS = {
    'Январь': 'Jan',
    'Февраль': 'Feb',
    'Март': 'Mar',
    'Апрель': 'Apr',
    'Май': 'May',
    'Июнь': 'Jun',
    'Июль': 'Jul',
    'Август': 'Aug',
    'Сентябрь': 'Sep',
    'Октябрь': 'Oct',
    'Ноябрь': 'Nov',
    'Декабрь': 'Dec'
}

const DAYS = {
    'Воскресенье': 'Sunday',
    'Понедельник': 'Monday',
    'Вторник': 'Tuesday ',
    'Среда': 'Wednesday ',
    'Четверг': 'Thursday ',
    'Пятница': 'Friday',
    'Суббота': 'Saturday',
}

//TODO: inprogress

export class SLFormattedDateTime extends LitElement {
    static properties = {
        value: {type: Number},
        era: {type: String},
        year: {type: String},
        month: {type: String},
        day: {type: String},
        hour12: {type: String},
        minute: {type: String},
        second: {type: String},
        timeZone: {attribute: 'time-zone', type: String},
        timeZoneName: {attribute: 'time-zone-name', type: String},
        weekday: {type: String},
        locate: {type: String},

        _dateInstance: {},
        _dateObject: {},
        _timeObject: {}
    };

    static styles = css`
      :host {
      }
    `;

    connectedCallback() {
        super.connectedCallback();

        this._dateInstance = new Date(this.value);
        this._dateObject = {
            year: this._dateInstance.getFullYear(),
            month: this._dateInstance.getMonth(),
            day: this._dateInstance.getDate(),
            weekDay: this._dateInstance.getDay()
        }
        this._timeObject = {
            hour: this._dateInstance.getHours(),
            minute: this._dateInstance.getMinutes(),
            second: this._dateInstance.getSeconds()
        }
    }

    constructor() {
        super();
        this.locate = 'RU';
        this.monthArray = this.locate === 'RU' ? Object.keys(MONTHS) : Object.values(MONTHS);
        this.daysArray = this.locate === 'RU' ? Object.keys(DAYS) : Object.values(DAYS);

    }

    get formattedDateTime() {
        return this.defaultDateTime;
    }

    formattingDataTime() {
        let result = ''

        if (!this.hour || (this.hour && this.year)) {
            if (this.weekday) {
                result += !this.weekday ? '' :
                    this.weekday === NARROW ? this._formatLengthToDay(NARROW) :
                        this.weekday === SHORT ? this._formatLengthToDay(SHORT) :
                            this._formatLengthToDay(LONG)
                result += ' ';
            }

            result += !this.day ? this._dateObject.day :
                this.day === TWO_DIGIT ? this._formatToTwoDigit(this._dateObject.day) :
                    this._dateObject.day
            result += ' ';


            result += !this.month || this.month === NUMERIC ? this._dateObject.month + 1 :
                this.month === TWO_DIGIT ? this._formatToTwoDigit(this._dateObject.month + 1) :
                    this.month === NARROW ? this._formatLengthToMonth(NARROW) :
                        this.month === SHORT ? this._formatLengthToMonth(SHORT) :
                            this._formatLengthToMonth(LONG)
            result += ' ';

            result += !this.year || this.year === NUMERIC ? this._dateObject.year :
                this._formatToTwoDigitYear(this._dateObject.year)
            result += ' ';
        }

        if (this.hour) {
            result += this.hour === NUMERIC ? 1 : 2
        }

        return result;
    }

    _formatHour(variant) {
        // return this._timeObject.hour >= 12 ? this._timeObject.hour - 12 + '' :
    }

    _formatToTwoDigit(number) {
        return number < 10 ? '0' + number : number;
    }

    _formatToTwoDigitYear(year) {
        return year.slice(1, 3);
    }

    _formatLengthToMonth(length) {
        return this._formatLength(Object.keys(MONTHS)[this._dateObject.month], length)
    }
    
    _formatLengthToDay(length) {
        return this._formatLength(Object.keys(DAYS)[this._dateObject.weekDay], length)
    }
    _formatLength(string, length) {
        switch (length) {
            case NARROW: {
                return string[0]
            }
            case SHORT: {
                return string.slice(0, 3)
            }
            case LONG: {
                return string
            }
        }
    } 

    render() {
        return html` <h1>${this.formattedDateTime}</h1> `;
    }
}

customElements.define('sl-formatted-date-time', SLFormattedDateTime);
export default SLFormattedDateTime;
