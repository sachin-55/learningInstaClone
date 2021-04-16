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

const getUserProfile = gql`
  query($userId: ID!) {
    userProfile(userId: $userId) {
      id
      user {
        id
        fullname
        username
        email
      }
      dateOfBirth
      followers {
        id
      }
      following {
        id
      }
      location
      bio
      userProfileImages {
        url
      }
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

const getUserNewsFeedPosts = gql`
  query($userId: ID!) {
    userNewsFeedPosts(userId: $userId) {
      id
      postUrl
      caption
      location
      user {
        fullname
        userProfile {
          userProfileImages {
            url
          }
        }
      }
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

const queryRecentlyAddedUsers = gql`
  query($userId: ID!) {
    recentlyAddedUsers(userId: $userId) {
      id
      fullname
      userProfile {
        followers {
          id
        }
      }
    }
  }
`;

const followUserMutation = gql`
  mutation($userId: ID!, $followingId: ID!) {
    followUser(userId: $userId, followingId: $followingId) {
      id
      following {
        id
      }
    }
  }
`;

const unfollowUserMutation = gql`
  mutation($userId: ID!, $unfollowingId: ID!) {
    unfollowUser(userId: $userId, unfollowingId: $unfollowingId) {
      id
    }
  }
`;

const addUserProfileImage = gql`
  mutation($name: String!, $url: String!, $userProfile: ID!) {
    addUserProfileImage(
      name: $name
      url: $url
      userProfile: $userProfile
    ) {
      name
      url
    }
  }
`;

export {
  loginMutation,
  signupMutation,
  getUserAllPosts,
  addUserPost,
  queryRecentlyAddedUsers,
  followUserMutation,
  unfollowUserMutation,
  getUserProfile,
  getUserNewsFeedPosts,
  addUserProfileImage,
};
