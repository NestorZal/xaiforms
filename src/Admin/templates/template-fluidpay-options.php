<?php ?>

<form method="post" action="options.php" autocomplete="off">
    <input type="hidden" name="option_page" value="wp-fluidpay-integration-options-group">
    <input type="hidden" name="action" value="update">
    <input type="hidden" name="_wp_http_referer" value="/wp-admin/admin.php?page=wp-fluidpay-integration-settings">

    <h2>Gateway Environment</h2>
    Choose your FluidPay Gateway environment, for testing purpose choose the sandbox.
    <table class="form-table" role="presentation"><tbody><tr><th scope="row">Choose your environment</th><td>        <div class="env-mode">
                    <select name="wp-fluidpay-integration-options[env_mode]">
                        <option value="test" selected="selected">Sandbox (test mode)</option><option value="live">Live</option>            </select>
                </div>
            </td></tr></tbody></table><h2>Manage API Keys</h2>
    To integrate your WordPress Site with FluidPay Gateway, you will need to add your API Keys.<table class="form-table" role="presentation"><tbody><tr><th scope="row">Public API key (optional)</th><td>        <div class="hide-show-toggle-key">
                    <input type="text" name="wp-fluidpay-integration-options[public_key]" class="regular-text" value="" autocomplete="off" aria-autocomplete="none">
                    <button type="button">
                        <span class="dashicons dashicons-visibility"></span>
                    </button>
                </div>
            </td></tr><tr><th scope="row">Private API key</th><td>        <div class="hide-show-toggle-key">
                    <input type="password" name="wp-fluidpay-integration-options[private_key]" class="regular-text" value="api_2SA0rYw4B3rbzr0usp8kEXanITi" autocomplete="off" aria-autocomplete="none">
                    <button type="button">
                        <span class="dashicons dashicons-visibility"></span>
                    </button>
                </div>
            </td></tr></tbody></table><h2>Routes</h2>
    <div>
        <b>Route for transaction (token required):</b> https://cubaexplorer.local/wp-json/wp-fluidpay-integration/v1/charge/        </div>
    <table class="form-table" role="presentation"><tbody><tr><th scope="row">Token for transactions</th><td>        <div class="token">
                    <div class="token-details"><b>key:</b><span>token</span></div>
                    <div class="token-details"><b>value:</b> <span>8f47db909c4ee809bc633435004cc0b6</span></div>
                </div>
            </td></tr></tbody>
    </table>

    <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>
</form>