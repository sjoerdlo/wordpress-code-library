<?php
$anchor = !empty($block['anchor']) ? 'id="' . esc_attr($block['anchor']) . '" ' : '';

$class_name = 'acf-form';
$class_name .= !empty($block['className']) ? ' ' . $block['className'] : '';
$class_name .= !empty($block['align']) ? ' align' . $block['align'] : '';

$selected_field_group = get_field('acf_frontend_forms');  // Get the selected field group key
$selected_field_group_label = $selected_field_group['label'];
$selected_field_group_key = $selected_field_group['value'];
?>

    <div <?php echo $anchor; ?>class="<?php echo esc_attr($class_name); ?>">
    <?php 
    if ($selected_field_group_key) {
        acf_form(array(
            'id'              => 'acf-form', // can reuse the registered form ID
            'post_id'         => 'new_post', // set to new_post or a specific post ID
            'new_post'        => array(
                'post_type'   => 'client',
                'post_status' => 'publish'
            ),
            'field_groups'    => array($selected_field_group_key), // dynamically set
            'post_title'      => true,
            'submit_value'    => __('Submit', 'acf'),
            'updated_message' => __('Success!', 'acf'),
        ));
    }
    ?>
</div>

 