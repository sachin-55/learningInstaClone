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
      comments {
        id
        comment
        likes
        created_at
        userId {
          id
          fullname
          username
          userProfile {
            userProfileImages {
              url
            }
          }
        }
      }
      created_at
      likes {
        userId {
          id
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
        userProfileImages {
          url
        }
      }
    }
  }
`;

const getFollowings = gql`
  query($userId: ID!) {
    followings(userId: $userId) {
      id
      fullname
      username
      userProfile {
        userProfileImages {
          url
        }
        user {
          id
        }
      }
    }
  }
`;

const getFollowers = gql`
  query($userId: ID!) {
    followers(userId: $userId) {
      id
      fullname
      username
      userProfile {
        userProfileImages {
          url
        }
        user {
          id
        }
      }
    }
  }
`;

const getUniqueUsers = gql`
  query($userIds: [ID]) {
    uniqueUsers(userIds: $userIds) {
      id
      fullname
      username
      userProfile {
        id
        userProfileImages {
          url
        }
      }
    }
  }
`;

const getGroup = gql`
  query($userId: ID!) {
    getUserGroup(userId: $userId) {
      id
      members {
        id
        fullname
        username
        userProfile {
          userProfileImages {
            url
          }
        }
      }
      groupType
      backgroundImage
    }
  }
`;

const getUserConversations = gql`
  query($groupId: ID!) {
    getUserConversations(groupId: $groupId) {
      id
      created_at
      groupId {
        id
        members {
          id
        }
      }
      senderId {
        id
      }
      message
      seen
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

const addNewComment = gql`
  mutation($userId: ID!, $comment: String!, $postId: ID!) {
    commentPost(userId: $userId, comment: $comment, postId: $postId) {
      comment
    }
  }
`;

const addLike = gql`
  mutation($userId: ID!, $postId: ID!) {
    likePostToggle(userId: $userId, postId: $postId) {
      userId {
        id
      }
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
  addNewComment,
  addLike,
  getFollowings,
  getFollowers,
  getUniqueUsers,
  getGroup,
  getUserConversations,
};
