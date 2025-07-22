import type { GetBirthdayCharactersQuery } from '../__generated__/graphql.ts';

export type CharacterFromQuery = NonNullable<
  NonNullable<GetBirthdayCharactersQuery['Page']>['characters']
>[number];

export function isValid(
  character: CharacterFromQuery
): character is NonNullable<CharacterFromQuery> {
  return character !== null;
}
