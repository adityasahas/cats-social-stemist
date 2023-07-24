/* eslint-disable */

import { Box, Text } from "@chakra-ui/react";
import FeedCard from "@/components/feedcard";
import { api } from "@/utils/api";
export default function Feed() {
  const posts = api.feed.posts.useQuery().data;
  if (posts) {
    return (
      <Box bg={"#f7beab"} pt={"120px"}>
      {posts.map((post) => (
          <FeedCard
            key={post.id}
            catname={post.catname}
            breed={post.breed}
            text={post.text}
            image={post.image}
            username={post.username}
            title={post.title}
            id={post.id}
            likes={post.numLikes}
          />
        ))
      }
      </Box>
    );
  } else {
    return (
    <Text>Loading...</Text>
    );
  }
  // wait a sec
}
