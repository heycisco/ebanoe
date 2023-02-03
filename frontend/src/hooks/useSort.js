import { useMemo } from 'react';

export const useSort = (posts, sort, reverse, query, advSearch, postLength) => {
	const sortedPosts = useMemo(() => {
		let postsTemp = posts;
		if (sort) {
			postsTemp = [...postsTemp].sort((a, b) =>
				a.attributes[sort].localeCompare(b.attributes[sort]),
			);
		}
		if (reverse) {
			postsTemp = [...postsTemp].reverse();
		}
		return postsTemp;
	}, [posts, sort, reverse]);

	const sortedSearchedPost = useMemo(() => {
		let postsTemp = sortedPosts;
		const queryTemp = query.toLowerCase();
		function sanitize(data) {
			if (data) {
				return data.replace(/<[^>]+>/g, '').toLowerCase();
			}
			return '';
		}
		if (!advSearch) {
			postsTemp = postsTemp.filter((post) =>
				post.attributes.title.toLowerCase().includes(queryTemp),
			);
		} else {
			postsTemp = postsTemp.filter((post) => {
				return (
					post.attributes.title.toLowerCase().includes(queryTemp) ||
					sanitize(post.attributes.short).includes(queryTemp) ||
					sanitize(post.attributes.more).includes(queryTemp)
				);
			});
		}
		return postsTemp;
	}, [sortedPosts, query, advSearch]);
	return sortedSearchedPost.slice(0, (postLength));
};
