if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
		.then(function(registration) {
			console.log('SW registration OK:', registration);
		})
		.catch(function(err) {
			console.log('SW registration FAIL:', err);
		});
}
