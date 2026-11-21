# XaiForms

A WordPress plugin for building custom forms and payment forms from plain HTML. A small React 18 front end turns custom tags (`<card>`, `<email>`, `<input type="price">`, `<formresponse>`) into working, validated fields, and a REST endpoint submits the payment to a gateway.

> Status: a small plugin I wrote a few years ago. It is not actively maintained and has no automated tests. It is shared as a code sample.

## Features

- Write forms as HTML templates; custom tags are replaced by React components (Formik, react-payment-inputs).
- Client-side validation and card masking, with per-field error messages set as attributes.
- Conditional fields and simple math expressions (for example, computed totals).
- `<formresponse status="success|declined|failed|error">` blocks to show per-outcome messages, with `<responsevalue name="...">` to print values from the gateway response.
- FluidPay gateway integration (`/wp-json/xaiforms/v1/fluidpay/charge`); an Authorize.net settings template is included but not implemented.
- Admin settings page for gateway credentials (requires `manage_options`).
- `xaiform_fluidpay_request_after` filter to modify the response after a charge.

## Structure

```
xaiforms.php                  Plugin bootstrap
src/Includes/                 Loader, base Route, helpers, shortcode, React source (js/), styles (sass/)
src/Admin/                    Admin pages and settings
src/Gateway/FluidPay/         Route, options, transaction and request resources
src/templates/                Example form (default.payment.form.php)
public/                       Compiled JS/CSS
```

## Example

See [`src/templates/default.payment.form.php`](src/templates/default.payment.form.php).

## Build

Requires PHP 8+, Node and Composer.

```bash
composer install
npm install
npm run build      # development build
npm run dist       # production build
npm run lint
```

## Security notes

- Card data is posted to the site's own REST route and forwarded to the gateway; it is not stored by the plugin.
- Guests must submit a valid WordPress nonce; the settings route requires `manage_options`.
- Incoming payloads are sanitized before being sent to the gateway.

## Known limitations

- No automated tests or CI.
- Only FluidPay is implemented.
- Targets older WordPress/React tooling versions; dependencies should be updated before production use.
