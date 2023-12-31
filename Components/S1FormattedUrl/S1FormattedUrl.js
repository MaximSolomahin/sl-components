import {LitElement, css, html} from '../../lib/lit.js'

export class S1FormattedUrl extends LitElement {
    static properties = {
        id: {type: String},
        tableName: {type: String, attribute: 'table-name'},
        label: {type: String},
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
    }

    get formattedUrl() {
        return html`<a href="#" @click="${this._followLink}">${this.label}</a>`
    }

    _followLink() {
        this.dispatchEvent(new CustomEvent('followlink', {
            detail: {
                id: this.id
            }
        }))
    }

    render() {
        return html`
            <span>${this.formattedUrl}</span>`
    }
}

customElements.define('s1-formatted-url', S1FormattedUrl);
export default S1FormattedUrl;