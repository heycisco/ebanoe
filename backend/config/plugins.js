module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        post: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  'users-permissions': {
	config: {
	  jwt: {
		 expiresIn: '60d',
	  },
	},
 },
});
