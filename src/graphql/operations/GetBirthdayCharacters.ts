import { gql } from '../__generated__';

export const GET_BIRTHDAY_CHARACTERS = gql(/* GraphQL */ `
  query GetBirthdayCharacters($page: Int = 1) {
    Page(page: $page) {
      pageInfo {
        hasNextPage
      }
      characters(isBirthday: true) {
        id
        name {
          full
        }
        age
        gender
        image {
          large
        }
        media {
          nodes {
            title {
              romaji
              english
            }
          }
        }
      }
    }
  }
`);
