<?php
/**
 * Client Details Block template.
 *
 * @param array $block The block settings and attributes.
 */

$class_name = 'clientDetails editableBlock'; // "editableBlock" css class makes it editable
$field_group_key = '66154c717aac0'; // To load the ACF fields for editing
$block_name = 'client-details'; // To re-render this block after editing

$post_id = get_the_ID();
$form_type = $_POST['form_type'] ?? ''; // Default to empty if not specified

// Support custom "anchor" values.
$anchor = !empty($block['anchor']) ? 'id="' . esc_attr($block['anchor']) . '" ' : '';

// Create class attribute allowing for custom "className" and "align" values.
$class_name .= !empty($block['className']) ? ' ' . $block['className'] : '';
$class_name .= !empty($block['align']) ? ' align' . $block['align'] : '';
?>

<div <?php echo $anchor; ?>class="<?php echo esc_attr($class_name); ?>" data-block-name="<?php echo esc_attr($block_name); ?>">
<?php 
    if ($form_type === 'edit') {
        // Block renders the edit form
        acf_form(array(
            'id'              => 'acf-form-' . $field_group_key, // can reuse the registered form ID
            'post_id'         => $_POST['post_id'], // set to new_post or a specific post ID
            'field_groups'    => array( 'group_' . $field_group_key ),
            'post_title'      => true,
            'submit_value'    => __('Update', 'acf'),
            'updated_message' => __('Content successfully updated.', 'acf'),
        ));
    } else {
        // Default: Block renders the content ?>
        <div class="clientDetails--inner">
            <div class="clientDetails--name">
                <?php echo get_field('client_name', $post_id); ?>
            </div>
            <div class="clientDetails--content">
                <?php echo get_field('client_address', $post_id); ?>
            </div>
        </div><?php
    } 
    ?>
</div>
