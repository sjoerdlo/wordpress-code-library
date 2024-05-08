/**
 * File editable-block.js
 *
 * Handles the initialization of frontend editable blocks
 */
const slnmEditableBlocks = (function ($) {

    function makeBlocksEditable() {
        // Add edit button
        $('.editableBlock').append('<a href="#" class="wp-block-button__link wp-element-button editableBlock--editLink">Edit</a>');

        // Swap content for edit form on click
        $(document).on('click', '.editableBlock--editLink', function (e) {
            e.preventDefault();
            const $editableBlock = $(this).closest('.editableBlock');
            const postIdMatch = $('body').attr('class').match(/postid-(\d+)/); // Extract postId from body class
            const postId = postIdMatch ? postIdMatch[1] : null;

            if (postId) {
                ajaxLoadFormEditableBlock(postId, $editableBlock);
                $editableBlock.find('.clientDetails--inner, .editableBlock--editLink').hide();
            } else {
                alert('Post ID not found.');
            }
        });
    }

    // Load the edit form using AJAX
    function ajaxLoadFormEditableBlock(postId, $editableBlock) {

        let blockName = $editableBlock.data('block-name');
        let $editableBlockForm = $editableBlock.find('.editableBlock--form');
        if ($editableBlockForm.length === 0) {
            $editableBlockForm = $('<div>', { class: 'editableBlock--form' }).appendTo($editableBlock);
        }

        $.ajax({
            url: slnm_ajax_object.ajaxurl,
            type: 'POST',
            data: {
                action: 'slnm_load_acf_form', // Action hook for the AJAX call
                post_id: postId, // Post ID to edit
                block_name: blockName,
                _ajax_nonce: slnm_ajax_object.nonce // Nonce for security
            },
            success: function (response) {
                $editableBlockForm.html(response).show();
                acf.do_action('append', $editableBlockForm);
                ajaxSafeFormEditableBlock(postId, $editableBlock);
            },
            error: function () {
                alert('Failed to load the form.');
            }
        });
    }

    function ajaxSafeFormEditableBlock(postId, $editableBlock) {

        $('.editableBlock--form form').on('submit', (e) => {
            e.preventDefault();
            let $form = $(e.target);
            let data = acf.serialize($form);
            let blockName = $form.parent('div').data('block-name');
            console.log(blockName);

            acf.lockForm($form);
            $.ajax({
                url: acf.get('ajaxurl'),
                type: 'POST',
                dataType: 'json',
                data: {
                    ...data,
                    action: 'slnm_save_acf_form',
                    post_id: postId,
                    block_name: blockName,
                    _ajax_nonce: slnm_ajax_object.nonce // Nonce for security
                },
            }).done(function (response) {
                acf.unlockForm($form);
                console.log(response);
                if (response.success) {
                    console.log('html:', response.data.html);
                    console.log('post title', response.data.post_title);

                    if (response.data.post_title) {
                        $editableBlock.closest('main').find('.wp-block-post-title').text(response.data.post_title);
                    }

                    $('.editableBlock--form').remove();
                    $editableBlockParent = $editableBlock.parent();
                    $editableBlockParent.html(response.data.html);
                    $editableBlockParent.find('.editableBlock').append('<a href="#" class="wp-block-button__link wp-element-button editableBlock--editLink">Edit</a>');
                } else {
                    console.error('Error:', response.data);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('AJAX request failed:', textStatus, errorThrown);
            });
        });

    }

    $(function () {
        // On DOM ready
        makeBlocksEditable();
    });

    return {

    };

})(jQuery);
