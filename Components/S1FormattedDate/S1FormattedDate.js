import {LitElement, css, html} from '../../lib/lit.js'

const VARIANT_SLASH = 'd/m/Y H:i:s';
const VARIANT_DOT = 'd.m.Y H:i:s';
const VARIANT_HYPHEN = 'Y-m-d H:i:s';

const VARIANT_TO_SEPARATOR = {
    VARIANT_SLASH: '/',
    VARIANT_DOT: '.',
    VARIANT_HYPHEN: '-'
}


export class S1FormattedDate extends LitElement {
    static properties = {
        date: {type: String},
        variant: {type: String}
    };

    static styles = css`
      :host {
      }
    `;

    connectedCallback() {
        super.connectedCallback();

        this._dateInstance = new Date(this.date);
    }

    constructor() {
        super();

    }

    get formattedDate() {
        switch (this.variant) {
            case VARIANT_SLASH: {
                return this._prepareDateWithSeparator(VARIANT_TO_SEPARATOR.VARIANT_SLASH);
            }
            case VARIANT_DOT: {
                return this._prepareDateWithSeparator(VARIANT_TO_SEPARATOR.VARIANT_DOT);
            }
            case VARIANT_HYPHEN: {
                return this._prepareDateWithSeparator(VARIANT_TO_SEPARATOR.VARIANT_HYPHEN, VARIANT_HYPHEN);
            }
        }
    }

    _prepareDateWithSeparator(separator, variant) {
        let result = variant !== VARIANT_HYPHEN ?
            this._formatToTwoDigit(this._dateInstance.getDate()) + separator +
            this._formatToTwoDigit(this._dateInstance.getMonth()) + separator +
            this._formatToTwoDigit(this._dateInstance.getFullYear())
            :
            this._formatToTwoDigit(this._dateInstance.getFullYear()) + separator +
            this._formatToTwoDigit(this._dateInstance.getMonth()) + separator +
            this._formatToTwoDigit(this._dateInstance.getDate())


        if (this.date.includes(':')) {
            result += ' ' + this._formatToTwoDigit(this._dateInstance.getHours()) + ':' +
                this._formatToTwoDigit(this._dateInstance.getMinutes()) + ':' +
                this._formatToTwoDigit(this._dateInstance.getSeconds())
        }

        return result;
    }


    _formatToTwoDigit(number) {
        return number < 10 ? '0' + number : number;
    }

    render() {
        return html`<span>${this.formattedDate}</span> `;
    }
}

customElements.define('s1-formatted-date', S1FormattedDate);
export default S1FormattedDate;
