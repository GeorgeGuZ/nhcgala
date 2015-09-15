'use strict';

module.exports = {
	db: 'mongodb://nhcdev:nhcdev@localhost/nhcgala-dev',
	app: {
		title: 'NHCGala - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1481419075507929',
		clientSecret: process.env.FACEBOOK_SECRET || '9c50f1d999e578c218f61a4f45b752cb',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '361735072885-er79l5pf5evir28hjogkl9jf4u81v65v.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'zHXbqGvlqku6Xo64T6EBeHHM',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
