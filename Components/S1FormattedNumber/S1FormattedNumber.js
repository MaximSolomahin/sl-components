import {LitElement, css, html} from '../../lib/lit.js'

const SYMBOL_OF_CURRENCY_CODE = {
    'RUB': '₽',
    'USD': '$',
    'EUR': '€',
    'CN': '¥'
}
const CURRENCY = 'currency';
const PERCENT = 'percent';

export class S1FormattedNumber extends LitElement {
    static properties = {
        value: {type: Number},
        fractionDigits: {attribute: 'fraction-digits', type: Number},
        format: {attribute: 'format', type: String},
        currencyCode: {attribute: 'currency-code', type: String}
    };

    static styles = css`
      :host {
      }
    `;

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.currencyCode = this.currencyCode === undefined && this.format === CURRENCY ?
            'RUB' : this.currencyCode;
    }

    get formattedNumber() {
        return this.currencyCode ?
            this.value.toFixed(this.fractionDigits) + SYMBOL_OF_CURRENCY_CODE[this.currencyCode] :
            this.value.toFixed(this.fractionDigits)
    }

    get percent() {
        return (this.value * 100).toFixed(this.fractionDigits) + '%'
    }

    render() {
        if (this.format === PERCENT) {
            return html`<span>${this.percent}</span>`;
        }
        return html`<span>${this.formattedNumber}</span>`;
    }
}

customElements.define('s1-formatted-number', S1FormattedNumber);
export default S1FormattedNumber;