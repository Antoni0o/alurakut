import React from 'react'
import Link from 'next/link'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../../src/components/MainGrid'
import { ProfileSidebar } from '../index'
import { EditedRelationshipBoxWrapper } from '../../src/components/Relationship'
import { AlurakutMenu } from '../../src/lib/AlurakutCommons'

export default function Page(props) {
    const githubUser = props.githubUser
    const [followers, setFollowers] = React.useState([])
    React.useEffect(function () {
        fetch(`https://api.github.com/users/${githubUser}/followers`)
            .then((serverResponse) => {
                return serverResponse.json()
            })
            .then((completeResponse) => {
                setFollowers(completeResponse)
            })
    }, [])

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />

            <MainGrid>
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>
                <div style={{ gridArea: 'welcomeArea' }}>
                    <EditedRelationshipBoxWrapper style={{ height: '92vh' }}>
                        <h2 className="smallTitle">Seguidores ({followers.length})</h2>

                        <ul>
                            {followers.map((follower) => {
                                return (
                                    //corrigir aqui, colocar o link do next
                                    <li key={follower.id}>
                                        <Link href={`../usuario/${follower.login}`}>
                                            <a>
                                                <img src={`https://github.com/${follower.login}.png`} />
                                                <span>{follower.login}</span>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                    </EditedRelationshipBoxWrapper >
                </div>
            </MainGrid>
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