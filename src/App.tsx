import './App.css';
import { useQuery } from '@apollo/client';

import { gql } from './__generated__';

const GET_BIRTHDAY_CHARACTERS = gql(/* GraphQL */ `
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

function App() {
  const { loading, error, data } = useQuery(GET_BIRTHDAY_CHARACTERS);

  if (loading) return <p>Lade Daten...</p>;
  if (error) return <p>Fehler: {error.message}</p>;
  if (!data?.Page?.characters) return <p>Keine Charaktere gefunden.</p>;

  const characters = data.Page.characters;
  const currentDate = new Date();

  return (
    <>
      <h1>{currentDate.toLocaleDateString()}</h1>
      <h2>Herzlichen Glückwunsch!</h2>
      {characters.map((character) => {
        if (!character?.media?.nodes)
          return <p key={character?.id}>Ungültige Character-Daten erhalten.</p>;

        const origin = character.media.nodes.map(
          (node) => node?.title?.romaji ?? ''
        );

        return (
          <div
            key={character.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}
          >
            <div>
              <h2>{character.name?.full ?? 'Unbekannt'}</h2>
              <p>
                <b>Alter:</b> {character.age ?? 'Unbekannt'}
              </p>
              <p>
                <b>Geschlecht:</b> {character.gender ?? 'Unbekannt'}
              </p>
              <p>
                <b>Herkunft:</b> {origin.join(', ')}
              </p>
            </div>
            <img
              src={character.image?.large ?? 'invalid url'}
              alt={'Image of ' + (character.name?.full ?? 'invalid name')}
              width={160}
            />
          </div>
        );
      })}
    </>
  );
}

export default App;
