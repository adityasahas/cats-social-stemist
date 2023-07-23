import { Box } from "@chakra-ui/react";
import FeedCard from "@/components/feedcard";

export default function Feed() {
  return (
    <>
      <Box bg={"#f7beab"} pt={"120px"}>
        <FeedCard
          catname="Fluffy"
          breed="Maine Coon"
          text="Some description about Fluffy"
          image="https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg?s=612x612&w=0&k=20&c=-G6l2c4jNI0y4cenh-t3qxvIQzVCOqOYZNvrRA7ZU5o="
          username="John Doe"
          title="My Awesome Cat Post"
          id="1"
          likes={1000}
        />
        <FeedCard
          catname="Fluffy"
          breed="Maine Coon"
          text="Some description about Fluffy"
          image="https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg?s=612x612&w=0&k=20&c=-G6l2c4jNI0y4cenh-t3qxvIQzVCOqOYZNvrRA7ZU5o="
          username="John Doe"
          title="My Awesome Cat Post"
          id="1"
          likes={1000}
        />
      </Box>
    </>
  );
}
