import { LitElement, css, html } from '../lib/lit.js'
import S1FormattedDateTime from "./S1FormattedDate/S1FormattedDate.js";
import S1FormattedNumber from "./S1FormattedNumber/S1FormattedNumber.js";
import S1FormattedUrl from "./S1FormattedUrl/S1FormattedUrl.js";

export class SlApp extends LitElement {
    static properties = {
        data: {},
    };

    static styles = css`
    :host {
    }
  `;

    constructor() {
        super();
    }

    render() {
        return html`
            <s1-formatted-date variant="d.m.Y H:i:s" date="2021-03-09 08:11:55"></s1-formatted-date> 
            <s1-formatted-number value="0.55559" fraction-digits="2" format="percent"></s1-formatted-number>
            <s1-formatted-url id="123" table-name="user" label="Петя Головин"></s1-formatted-url>
        `;
    }
}
customElements.define('sl-application', SlApp);
export default SlApp;
