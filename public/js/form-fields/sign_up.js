(function () {
	'use strict';

	window.signUpFields = [
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
                name: 'password',
                type: 'password',
                placeholder: 'Password',
            },
        },
        {
            attrs: {
                name: 'password_repeat',
                type: 'password',
                placeholder: 'Repeat Password',
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
