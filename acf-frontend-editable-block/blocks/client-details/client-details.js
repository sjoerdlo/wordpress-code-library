
if (typeof clientDetails === 'undefined') {
    const clientDetails = (function ($) {

        function syncNameFieldToTitleField() {
            $('body').on('input', '[data-name="client_name"] input', function () {
                // 'this' refers to the '[data-name="client_name"] input' that triggered the event
                var postTitleValue = $(this).val();
                console.log('go');

                // Update the clientName input field with the value of the postTitle input field
                // Ensure the clientName field is targeted correctly
                var $clientName = $('[data-name="_post_title"] input');
                $clientName.val(postTitleValue);
            });
        }

        $(function () {
            // On DOM ready
            console.log('dom ready');
            syncNameFieldToTitleField();
        });

        return {

        };

    })(jQuery);
}
