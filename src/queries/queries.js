import { gql } from '@apollo/client';

const signupMutation = gql`
  mutation(
    $fullname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      fullname: $fullname
      username: $username
      email: $email
      password: $password
    ) {
      token
      fullname
      username
      email
      id
    }
  }
`;

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      fullname
      username
      email
      id
    }
  }
`;

const getUserAllPosts = gql`
  query($userId: ID!) {
    userPosts(userId: $userId) {
      id
      postUrl
      caption
      location
    }
  }
`;

const addUserPost = gql`
  mutation Post(
    $caption: String!
    $postUrl: String!
    $location: String!
    $user: ID!
    $mentions: [ID]
  ) {
    addPost(
      caption: $caption
      postUrl: $postUrl
      location: $location
      user: $user
      mentions: $mentions
    ) {
      caption
      postUrl
      location
    }
  }
`;

export {
  loginMutation,
  signupMutation,
  getUserAllPosts,
  addUserPost,
};
