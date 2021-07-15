import React from 'react'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { RelationshipBoxWrapper } from '../src/components/Relationship'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'


function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '.8rem' }} alt="foto de perfil" />
      <hr />

      <p>
        <a href={`https://www.github.com/${props.githubUser}`} className="boxLink">
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'Antoni0o'
  const [communities, setCommunities] = React.useState([{
    id: 15849,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const favoritePeople = [
    'omariosouto',
    'juunegreiros',
    'peas',
    'rafaballerini',
    'filipedeschamps',
    'lucasmontano'
  ]

  return (
    <>
      <AlurakutMenu />

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
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault()
              const formData = new FormData(e.target)
              let imageID = Math.floor(Math.random() * 10)

              const community = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image') || `https://picsum.photos/300/300?${imageID}`
              }

              const updatedCommunities = [...communities, community]
              setCommunities(updatedCommunities)
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

              <button>Criar Comunidade</button>

            </form>
          </Box>

        </div>

        <div className="relationshipArea" style={{ gridArea: 'relationshipArea' }}>
          <RelationshipBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>

            <ul>
              {communities.map((communityContent) => {
                return (
                  <li key={communityContent.id}>
                    <a href={`/users/${communityContent.title}`}>
                      <img src={`${communityContent.image}`} />
                      <span>{communityContent.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </RelationshipBoxWrapper>

          <RelationshipBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({favoritePeople.length})</h2>

            <ul>
              {favoritePeople.map((githubUser) => {
                return (
                  <li key={githubUser}>
                    <a href={`https://github.com/${githubUser}`}>
                      <img src={`https://github.com/${githubUser}.png`} />
                      <span>{githubUser}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </RelationshipBoxWrapper>
        </div >

      </MainGrid >
    </>
  )
}
