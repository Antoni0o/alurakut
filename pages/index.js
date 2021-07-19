import React from 'react'
import Link from 'next/link'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { RelationshipBoxWrapper } from '../src/components/Relationship'
import RelationshipLink from '../src/components/RelationshipLink'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'


export function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '50%' }} alt="foto de perfil" />
      <hr />

      <p>
        <a href={`https://www.github.com/${props.githubUser}`} className="boxLink">
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault githubUser={props.githubUser} />
    </Box>
  )
}

function RelationshipBox(props) {
  const limitedRelationships = props.items.slice(0, 6)
  return (
    <RelationshipBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>

      <ul>
        {limitedRelationships.map((props) => {
          return (
            <li key={props.id}>
              <Link href={`/usuario/${props.login}`}>
                <a>
                  <img src={`https://github.com/${props.login}.png`} />
                  <span>{props.login}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>

      <RelationshipLink>
        <a href={`/amigos/${props.title.toLowerCase()}`}>Ver Mais</a>
      </RelationshipLink>

    </RelationshipBoxWrapper >
  )
}

function CommunitiesBox(props) {
  const limitedCommunities = props.items.slice(0, 6)

  return (
    <RelationshipBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>

      <ul>
        {limitedCommunities.map((props) => {
          return (
            <li key={props.id}>
              <a href={`${props.contentUrl}`}>
                <img src={`${props.imageUrl}`} />
                <span>{props.title}</span>
              </a>
            </li>
          )
        })}
      </ul>

      <RelationshipLink>
        <a href={`/comunidades`}>Ver Mais</a>
      </RelationshipLink>

    </RelationshipBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser

  const [communities, setCommunities] = React.useState([])
  const [following, setFollowing] = React.useState([])
  const [followers, setFollowers] = React.useState([])
  React.useEffect(function () {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((serverResponse) => {
        return serverResponse.json()
      })
      .then((completeResponse) => {
        setFollowers(completeResponse)
      })

    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((serverResponse) => {
        return serverResponse.json()
      })
      .then((completeResponse) => {
        setFollowing(completeResponse)
      })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f90d78b4c44432694c56f693306af0',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            id
            title
            imageUrl
            contentUrl
            creatorSlug
          }
        }`})
    })
      .then((response) => response.json())
      .then((completeResponse) => {
        const datoCommunities = completeResponse.data.allCommunities;
        setCommunities(datoCommunities)
      })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">Crie sua comunidade!</h2>

            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault()
              const formData = new FormData(e.target)

              const community = {
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                contentUrl: formData.get('link'),
                creatorSlug: githubUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(community)
              })
                .then(async (res) => {
                  const datas = await res.json()
                  const community = datas.createdRecord
                  const updatedCommunities = [...communities, community]
                  setCommunities(updatedCommunities)
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque da sua URL comunidade"
                  name="link"
                  aria-label="Coloque da sua URL comunidade"
                  type="text"
                />
              </div>

              <button>Criar Comunidade</button>

            </form>
          </Box>

        </div>

        <div className="relationshipArea" style={{ gridArea: 'relationshipArea' }}>

          <CommunitiesBox title="Comunidades" items={communities} />

          <RelationshipBox title="Seguidores" items={followers} />

          <RelationshipBox title="Seguindo" items={following} />

        </div >

      </MainGrid >
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((response) => response.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }
  }
}
