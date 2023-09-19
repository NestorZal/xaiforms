<?php
$fluidpay_route = new \XaiForms\Gateway\FluidPay\FluidPayRoute();
$fluidpay_options = new \XaiForms\Gateway\FluidPay\FluidPayOption();

$options = $fluidpay_options->all();

$environments = [
    'test' => 'Sandbox (test mode)',
    'live' => 'Live'
];

$val = $options['env-mode'] ?? '';

$escaped_options = '';
foreach ($environments as $key => $env) {
    $selected = $val === $key ? 'selected="selected"' : '';
    $escaped_options .= '<option value="'.$key.'" '.$selected.'>'.$env.'</option>';
}
?>

<form action="<?php echo $fluidpay_route->get_route_url('save_option'); ?>" method="post">
    <?php wp_nonce_field('wp_rest'); ?>
    <h2>Gateway Environment</h2>
    Choose your FluidPay Gateway environment, for testing purpose choose the sandbox.
    <table class="form-table" role="presentation">
        <tbody>
            <tr>
                <th scope="row">Choose your environment</th>
                <td>
                    <div class="env-mode">
                        <select name="env-mode" required>
                            <?php echo $escaped_options; ?>
                        </select>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <h2>Private API Key</h2>
    To integrate your WordPress Site with FluidPay Gateway, you will need to add your Private API Key.
    <table class="form-table" role="presentation">
        <tbody>
            <tr>
                <th scope="row">Private API key</th>
                <td>
                    <input type="hide-show-input" name="private-key" class="regular-text" value="<?php echo $options['private-key'] ?? ''; ?>" autocomplete="off" aria-autocomplete="none" required>
                </td>
            </tr>
        </tbody>
    </table>

    <button type="submit">Save Changes</button>
</form>
