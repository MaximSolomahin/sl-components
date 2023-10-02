import {LitElement, css, html} from '../../lib/lit.js'

const TARGET_NEW_TAB = '_blank';

export class S1FormattedUrl extends LitElement {
    static properties = {
        id: {type: String},
        tableName: {type: String, attribute: 'table-name'},
        label: {type: String},
        target: {type: String},
        withModal: {type: String, attribute: 'with-modal', converter: (value) => value === 'true'},
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

        this.url = `${window.location.origin}/record/${this.tableName}/${this.id}`;
    }

    get formattedUrl() {
        if (this.withModal) {
            return html`<a href="#" @click="${this._openModalWithInformation}">${this.label}</a>`
        } else {
            return html`<a href="${this.url}" target="${this.target === TARGET_NEW_TAB ? TARGET_NEW_TAB : ''}" >${this.label}</a>`
        }
    }

    _openModalWithInformation() {
        console.log('Отправляем')
        this.dispatchEvent(new CustomEvent('showmodal', {
            detail: {
                id: this.id
            }
        }))
    }

    render() {
        return html`
            <slot>${this.formattedUrl}</slot>`
    }
}

customElements.define('s1-formatted-url', S1FormattedUrl);
export default S1FormattedUrl;