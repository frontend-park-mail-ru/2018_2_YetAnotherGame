(function () {
	'use strict';

	window.updateFields = [
		{
			attrs: {
                name: 'email',
                type: 'email',
                placeholder: 'Email',
			},
		},
        {
            attrs: {
                name: 'username',
                type: 'text',
                placeholder: 'Username',
            },
        },
        {
            attrs: {
                name: 'first_name',
                type: 'text',
                placeholder: 'First Name',
            },
        },
        {
			attrs: {
                name: 'last_name',
                type: 'text',
                placeholder: 'Last Name',
			},
        },
		{
			attrs: {
                name: 'image',
                type: 'file',
                accept: 'image/*',
			},
		},
        {
            attrs: {
                name: 'submit',
                type: 'submit',
            },
        }
	];

})();
